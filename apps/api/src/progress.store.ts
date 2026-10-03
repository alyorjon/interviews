import { createClient } from "redis";

/** Card id -> self-assessed confidence (1..10). */
export type ProgressScores = Record<string, number>;

export interface ProgressStore {
  get(userId: number): Promise<ProgressScores>;
  /** Upserts the given scores and returns the user's full progress. */
  merge(userId: number, scores: ProgressScores): Promise<ProgressScores>;
  ping(): Promise<boolean>;
  close(): Promise<void>;
}

export const PROGRESS_STORE = Symbol("PROGRESS_STORE");

/** A signed user may not grow their record without bound (the catalog has a few thousand cards). */
export const MAX_CARDS_PER_USER = 10_000;

/** The backing store is unreachable; callers should answer 503 quickly instead of hanging. */
export class StoreUnavailableError extends Error {}

/** Adding these scores would push the user past MAX_CARDS_PER_USER. */
export class ProgressLimitError extends Error {}

function parseScores(raw: Record<string, string>): ProgressScores {
  const scores: ProgressScores = {};
  for (const [cardId, value] of Object.entries(raw)) {
    const score = Number(value);
    if (Number.isInteger(score) && score >= 1 && score <= 10) scores[cardId] = score;
  }
  return scores;
}

/**
 * Process-local store for tests and single-instance development. State is
 * lost on restart and is not shared between replicas.
 */
export class MemoryProgressStore implements ProgressStore {
  private readonly users = new Map<number, Map<string, number>>();

  async get(userId: number): Promise<ProgressScores> {
    return Object.fromEntries(this.users.get(userId) ?? []);
  }

  async merge(userId: number, scores: ProgressScores): Promise<ProgressScores> {
    const current = this.users.get(userId) ?? new Map<string, number>();
    const added = Object.keys(scores).filter((cardId) => !current.has(cardId)).length;
    if (current.size + added > MAX_CARDS_PER_USER) throw new ProgressLimitError();
    for (const [cardId, score] of Object.entries(scores)) current.set(cardId, score);
    this.users.set(userId, current);
    return Object.fromEntries(current);
  }

  async ping(): Promise<boolean> {
    return true;
  }

  async close(): Promise<void> {}
}

/**
 * One Redis hash per user (`progress:v1:<userId>`, field = card id). Every API
 * replica reads and writes the same keys, so the API itself stays stateless.
 */
export class RedisProgressStore implements ProgressStore {
  private readonly client;

  constructor(url: string) {
    this.client = createClient({
      url,
      // Fail commands immediately while disconnected instead of queueing them:
      // a hanging request is worse than a fast 503 the client can retry later.
      disableOfflineQueue: true,
      socket: { connectTimeout: 5_000, reconnectStrategy: (retries) => Math.min(retries * 100, 3_000) },
    });
    this.client.on("error", () => undefined);
    // Reconnects forever in the background; readiness reports the state meanwhile.
    this.client.connect().catch(() => undefined);
  }

  private async run<T>(command: () => Promise<T>): Promise<T> {
    if (!this.client.isReady) throw new StoreUnavailableError();
    try {
      return await command();
    } catch (error) {
      if (!this.client.isReady) throw new StoreUnavailableError();
      throw error;
    }
  }

  private key(userId: number): string {
    return `progress:v1:${userId}`;
  }

  async get(userId: number): Promise<ProgressScores> {
    return parseScores(await this.run(() => this.client.hGetAll(this.key(userId))));
  }

  async merge(userId: number, scores: ProgressScores): Promise<ProgressScores> {
    const key = this.key(userId);
    const fields = Object.fromEntries(Object.entries(scores).map(([cardId, score]) => [cardId, String(score)]));
    return await this.run(async () => {
      // Soft cap: the check and the write are not atomic, so a burst can overshoot by one batch.
      const [size, existing] = await this.client.multi().hLen(key).hmGet(key, Object.keys(fields)).exec() as unknown as [number, Array<string | null>];
      const added = existing.filter((value) => value === null).length;
      if (size + added > MAX_CARDS_PER_USER) throw new ProgressLimitError();
      const [, all] = await this.client.multi().hSet(key, fields).hGetAll(key).exec() as unknown as [unknown, Record<string, string>];
      return parseScores(all);
    });
  }

  async ping(): Promise<boolean> {
    try {
      return this.client.isReady && (await this.client.ping()) === "PONG";
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    // A graceful QUIT needs a live connection; while reconnecting, just drop the socket.
    if (this.client.isReady) await this.client.close();
    else if (this.client.isOpen) this.client.destroy();
  }
}
