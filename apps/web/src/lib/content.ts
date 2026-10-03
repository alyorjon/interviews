import type { StaticManifest, StaticPage, StaticTopic } from "@interviews/content";

const DATA_ROOT = "/data";

export class HttpError extends Error {
  constructor(readonly status: number) {
    super(`HTTP ${status}`);
  }
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) throw new HttpError(response.status);
  return await response.json() as T;
}

let manifestPromise: Promise<StaticManifest> | undefined;
const shards = new Map<string, Promise<unknown>>();

/**
 * The only entry point that can change between deploys; `no-cache` lets the
 * browser revalidate it while every shard it points to is immutable.
 */
export function loadManifest(fresh = false): Promise<StaticManifest> {
  if (fresh || !manifestPromise) {
    const pending = getJson<StaticManifest>(`${DATA_ROOT}/manifest.json`, fresh ? { cache: "no-cache" } : undefined);
    pending.catch(() => { if (manifestPromise === pending) manifestPromise = undefined; });
    manifestPromise = pending;
  }
  return manifestPromise;
}

function loadShard<T>(file: string): Promise<T> {
  let shard = shards.get(file) as Promise<T> | undefined;
  if (!shard) {
    shard = getJson<T>(`${DATA_ROOT}/${file}`);
    shards.set(file, shard);
    const pending = shard;
    pending.catch(() => { if (shards.get(file) === pending) shards.delete(file); });
  }
  return shard;
}

/**
 * Resolves a shard through the manifest. After a deploy an open tab may hold
 * an old manifest whose shard names no longer exist, so a 404 reloads it once.
 */
async function resolveShard<T>(pick: (manifest: StaticManifest) => string | undefined): Promise<T | undefined> {
  const file = pick(await loadManifest());
  if (!file) return undefined;
  try {
    return await loadShard<T>(file);
  } catch (error) {
    if (!(error instanceof HttpError) || error.status !== 404) throw error;
    const freshFile = pick(await loadManifest(true));
    return freshFile ? await loadShard<T>(freshFile) : undefined;
  }
}

export function loadPage(slug: string): Promise<StaticPage | undefined> {
  return resolveShard<StaticPage>((manifest) => manifest.topics
    .flatMap((topic) => topic.pages).find((page) => page.slug === slug)?.file);
}

export function loadTopic(topicId: string): Promise<StaticTopic | undefined> {
  return resolveShard<StaticTopic>((manifest) => manifest.topics.find((topic) => topic.id === topicId)?.file);
}

/** Test hook: forget cached promises between test cases. */
export function resetContentCache(): void {
  manifestPromise = undefined;
  shards.clear();
}
