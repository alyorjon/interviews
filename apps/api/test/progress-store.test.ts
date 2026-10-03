import assert from "node:assert/strict";
import { test } from "node:test";

import { MAX_CARDS_PER_USER, MemoryProgressStore, ProgressLimitError, RedisProgressStore, StoreUnavailableError } from "../src/progress.store.js";

test("an unreachable Redis fails fast with StoreUnavailableError instead of hanging", async () => {
  const store = new RedisProgressStore("redis://127.0.0.1:1");
  const started = performance.now();
  await assert.rejects(store.get(1), StoreUnavailableError);
  await assert.rejects(store.merge(1, { "card-aaaaaaaaaaaaaaaaaaaa": 5 }), StoreUnavailableError);
  assert.equal(await store.ping(), false);
  assert.ok(performance.now() - started < 1_000, "must not wait for a reconnect");
  await store.close();
});

test("a user's progress cannot grow past the per-user cap, but re-rating known cards is fine", async () => {
  const store = new MemoryProgressStore();
  const full = Object.fromEntries(Array.from({ length: MAX_CARDS_PER_USER }, (_, index) => [`card-${String(index).padStart(20, "0")}`, 5]));
  await store.merge(7, full);
  await assert.rejects(store.merge(7, { "card-ffffffffffffffffffff": 5 }), ProgressLimitError);
  assert.equal((await store.merge(7, { "card-00000000000000000000": 9 }))["card-00000000000000000000"], 9);
});

const redisUrl = process.env.REDIS_TEST_URL;

test("RedisProgressStore round-trips, isolates users and enforces the cap", { skip: !redisUrl && "set REDIS_TEST_URL to run" }, async () => {
  const store = new RedisProgressStore(redisUrl!);
  const userA = 900_000_000 + Math.floor(Math.random() * 1_000_000);
  const userB = userA + 1;
  for (let attempt = 0; !(await store.ping()) && attempt < 50; attempt++) await new Promise((resolve) => setTimeout(resolve, 20));
  try {
    assert.deepEqual(await store.get(userA), {});
    await store.merge(userA, { "card-aaaaaaaaaaaaaaaaaaaa": 4 });
    assert.deepEqual(await store.merge(userA, { "card-bbbbbbbbbbbbbbbbbbbb": 9, "card-aaaaaaaaaaaaaaaaaaaa": 6 }), {
      "card-aaaaaaaaaaaaaaaaaaaa": 6, "card-bbbbbbbbbbbbbbbbbbbb": 9,
    });
    assert.deepEqual(await store.get(userB), {});

    const full = Object.fromEntries(Array.from({ length: MAX_CARDS_PER_USER - 2 }, (_, index) => [`card-${String(index).padStart(20, "0")}`, 5]));
    await store.merge(userA, full);
    await assert.rejects(store.merge(userA, { "card-ffffffffffffffffffff": 5 }), ProgressLimitError);
    assert.equal((await store.merge(userA, { "card-aaaaaaaaaaaaaaaaaaaa": 10 }))["card-aaaaaaaaaaaaaaaaaaaa"], 10);
  } finally {
    await store.close();
  }
});
