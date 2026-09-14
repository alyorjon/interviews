import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import type { Catalog } from "@interviews/content";

import { CatalogStore } from "../src/catalog.store.js";

test("CatalogStore builds and reuses one card index", async () => {
  let loads = 0;
  const catalog = {
    schemaVersion: 1,
    generatedAt: "2026-09-12T00:00:00.000Z",
    pages: [],
    cards: [{ id: "card-1" }],
    nearDuplicates: [],
    summary: {},
  } as unknown as Catalog;
  const store = new CatalogStore({ catalogLoader: async () => { loads += 1; return catalog; } });

  const first = await store.getCardIndex();
  const second = await store.getCardIndex();

  assert.strictEqual(first, second);
  assert.strictEqual(first.get("card-1"), catalog.cards[0]);
  assert.equal(loads, 1);
});

test("CatalogStore loads a build-time catalog from its public runtime path", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "interviews-catalog-"));
  const catalog = {
    schemaVersion: 1,
    generatedAt: "2026-09-12T00:00:00.000Z",
    pages: [],
    cards: [],
    nearDuplicates: [],
    summary: {
      pageCount: 0,
      extractedQuestionCount: 0,
      canonicalQuestionCount: 0,
      duplicateCount: 0,
      nearDuplicateCount: 0,
      questionsNeedingSource: 0,
    },
  } satisfies Catalog;
  const catalogPath = path.join(root, "catalog.json");
  await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

  try {
    const loaded = await new CatalogStore({ catalogPath }).getCatalog();
    assert.deepEqual(loaded, catalog);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
