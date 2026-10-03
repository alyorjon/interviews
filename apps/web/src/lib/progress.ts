import { readJson, writeJson } from "./storage";

export type Scores = Record<string, number>;

export const PROGRESS_KEY = "interviews-progress-v1";
export const PENDING_KEY = "interviews-progress-pending-v1";
/** Mirrors the API's per-request cap. */
export const MAX_BATCH = 500;

export function isScore(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) >= 1 && (value as number) <= 10;
}

/** Drops anything that is not `{ [cardId]: 1..10 }`, e.g. corrupt or legacy storage. */
export function sanitizeScores(value: unknown): Scores {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, score]) => id.length > 0 && isScore(score)));
}

export function readScores(key: string): Scores {
  return sanitizeScores(readJson<unknown>(key, {}));
}

export function writeScores(key: string, scores: Scores): void {
  writeJson(key, scores);
}

/** 401/403: the Telegram session is rejected; retrying cannot help. */
export class ProgressAccessError extends Error {}

/** Other 4xx: the server will never accept this exact batch, so it must not be retried. */
export class ProgressRejectedError extends Error {}

async function request(initData: string, init?: RequestInit): Promise<Scores> {
  const response = await fetch("/api/me/progress", {
    ...init,
    headers: { "X-Telegram-Init-Data": initData, ...(init?.body ? { "content-type": "application/json" } : {}) },
  });
  if (response.status === 401 || response.status === 403) throw new ProgressAccessError();
  if (response.status >= 400 && response.status < 500 && response.status !== 408 && response.status !== 429) {
    throw new ProgressRejectedError(`HTTP ${response.status}`);
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return sanitizeScores((await response.json() as { scores?: unknown }).scores);
}

export function fetchServerScores(initData: string): Promise<Scores> {
  return request(initData);
}

export function pushScores(initData: string, scores: Scores, keepalive = false): Promise<Scores> {
  return request(initData, { method: "PUT", body: JSON.stringify({ scores }), keepalive });
}
