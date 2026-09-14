import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";

import type { INestApplication } from "@nestjs/common";
import type { Catalog } from "@interviews/content";

import { createApplication } from "../src/app.js";

let app: INestApplication | undefined;
const syntheticToken = "123456:synthetic-secret";
const syntheticUserId = "10001";

function signedInitData(userId: string, authDate: number): string {
  const fields = new URLSearchParams({
    auth_date: String(authDate),
    query_id: "synthetic-query",
    user: JSON.stringify({ id: Number(userId), first_name: "Test" }),
  });
  const checkString = [...fields.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join("\n");
  const secret = createHmac("sha256", "WebAppData").update(syntheticToken).digest();
  fields.set("hash", createHmac("sha256", secret).update(checkString).digest("hex"));
  return fields.toString();
}

const catalog: Catalog = {
  schemaVersion: 1,
  generatedAt: "2026-09-12T00:00:00.000Z",
  summary: {
    pageCount: 2,
    extractedQuestionCount: 3,
    canonicalQuestionCount: 3,
    duplicateCount: 0,
    nearDuplicateCount: 0,
    questionsNeedingSource: 0,
  },
  nearDuplicates: [],
  pages: [
    {
      slug: "javascript-basics",
      title: "JavaScript asoslari",
      sourcePath: "javascript/basics.md",
      markdown: "# JavaScript asoslari",
      cardIds: ["card-1", "card-2"],
      contentScore: { score: 8, label: "yetuk", reasons: ["izohli"] },
      designReadinessScore: { score: 9, label: "kuchli", reasons: ["tuzilgan"] },
      overallScore: { score: 8, label: "yetuk", reasons: ["tayyor"] },
    },
    {
      slug: "docker-basics",
      title: "Docker asoslari",
      sourcePath: "docker/basics.md",
      markdown: "# Docker asoslari",
      cardIds: ["card-3"],
      contentScore: { score: 7, label: "yetuk", reasons: ["izohli"] },
      designReadinessScore: { score: 8, label: "yetuk", reasons: ["tuzilgan"] },
      overallScore: { score: 7, label: "yetuk", reasons: ["tayyor"] },
    },
  ],
  cards: ["card-1", "card-2", "card-3"].map((id, index) => ({
    id,
    fingerprint: `fingerprint-${index + 1}`,
    question: `Savol ${index + 1}?`,
    answer: `Javob ${index + 1}`,
    expandedQuestion: `Keng savol ${index + 1}?`,
    expandedAnswer: `Keng javob ${index + 1}`,
    enrichment: { questionContext: "", answerSummary: "", answerDetail: "", groundingFragments: [] },
    sourceGrounded: true,
    needsSource: false,
    options: [],
    quality: { score: 8, label: "yetuk", reasons: ["aniq"] },
    metadata: { difficulty: "beginner", tags: [], keyPoint: "Asos", followUp: "Keyin?", commonMistake: "Xato" },
    sources: [{ sourcePath: index < 2 ? "javascript/basics.md" : "docker/basics.md", question: `Savol ${index + 1}?`, line: index + 1 }],
  })),
};

afterEach(async () => {
  await app?.close();
  app = undefined;
});

test("GET /health reports a healthy API when the Telegram bot is disabled", async () => {
  app = await createApplication({ botToken: "", logger: false });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");

  const response = await fetch(`http://127.0.0.1:${address.port}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    service: "interviews-api",
    bot: { status: "disabled" },
  });
});

test("production service serves the built Vite entry point and assets", async () => {
  const staticRoot = await mkdtemp(path.join(tmpdir(), "interviews-web-"));
  await mkdir(path.join(staticRoot, "assets"));
  await writeFile(path.join(staticRoot, "index.html"), "<!doctype html><title>Interview Portal</title>", "utf8");
  await writeFile(path.join(staticRoot, "assets", "app.js"), "globalThis.portalReady=true;", "utf8");
  try {
    app = await createApplication({ botToken: "", staticRoot, logger: false });
    await app.listen(0, "127.0.0.1");
    const address = app.getHttpServer().address();
    assert(address && typeof address === "object");
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const entry = await fetch(`${baseUrl}/`);
    assert.equal(entry.status, 200);
    assert.match(await entry.text(), /Interview Portal/);
    const asset = await fetch(`${baseUrl}/assets/app.js`);
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get("content-type") ?? "", /javascript/);

    const deepLink = await fetch(`${baseUrl}/topics/javascript`);
    assert.equal(deepLink.status, 200);
    assert.match(deepLink.headers.get("content-type") ?? "", /text\/html/);
    assert.match(await deepLink.text(), /Interview Portal/);

    const arbitraryClientRoute = await fetch(`${baseUrl}/study/session/today`);
    assert.equal(arbitraryClientRoute.status, 200);
    assert.match(arbitraryClientRoute.headers.get("content-type") ?? "", /text\/html/);
    assert.match(await arbitraryClientRoute.text(), /Interview Portal/);

    const unknownApi = await fetch(`${baseUrl}/api/not-a-route`, { headers: { accept: "text/html" } });
    assert.equal(unknownApi.status, 404);
    assert.doesNotMatch(await unknownApi.text(), /Interview Portal/);
  } finally {
    await app?.close();
    app = undefined;
    await rm(staticRoot, { recursive: true, force: true });
  }
});

test("catalog stays lightweight and page cards are paginated", async () => {
  app = await createApplication({ botToken: "", authBypass: true, catalogLoader: async () => catalog, logger: false });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");
  const baseUrl = `http://127.0.0.1:${address.port}`;

  const listResponse = await fetch(`${baseUrl}/api/catalog?page=2&pageSize=1`);
  assert.equal(listResponse.status, 200);
  const list = await listResponse.json();
  assert.deepEqual(list.pagination, { page: 2, pageSize: 1, totalItems: 2, totalPages: 2 });
  assert.equal(list.items[0].slug, "docker-basics");
  assert.equal(list.items[0].cardCount, 1);
  assert.equal("markdown" in list.items[0], false);
  assert.equal("cards" in list, false);

  const pageResponse = await fetch(`${baseUrl}/api/pages/javascript-basics?page=2&pageSize=1`);
  assert.equal(pageResponse.status, 200);
  const page = await pageResponse.json();
  assert.equal(page.page.slug, "javascript-basics");
  assert.equal(page.cards.length, 1);
  assert.equal(page.cards[0].id, "card-2");
  assert.deepEqual(page.pagination, { page: 2, pageSize: 1, totalItems: 2, totalPages: 2 });
});

test("an invalid BOT_TOKEN leaves API health available", async () => {
  const telegramFetch: typeof fetch = async () => new Response(
    JSON.stringify({ ok: false, error_code: 401, description: "Unauthorized" }),
    { status: 401 },
  );
  app = await createApplication({
    botToken: "invalid-test-token",
    allowedTelegramUserId: syntheticUserId,
    publicUrl: "https://interviews.example.com",
    telegramFetch,
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");

  await new Promise((resolve) => setTimeout(resolve, 5));
  const response = await fetch(`http://127.0.0.1:${address.port}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    service: "interviews-api",
    bot: { status: "error" },
  });
});

test("pagination rejects integers that cannot be represented safely", async () => {
  app = await createApplication({ botToken: "", authBypass: true, catalogLoader: async () => catalog, logger: false });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");

  const response = await fetch(`http://127.0.0.1:${address.port}/api/catalog?page=999999999999999999999999999&pageSize=1`);

  assert.equal(response.status, 400);
});

test("catalog rejects requests without Telegram Mini App initData while health stays public", async () => {
  app = await createApplication({
    botToken: "synthetic-token",
    allowedTelegramUserId: "10001",
    catalogLoader: async () => catalog,
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");
  const baseUrl = `http://127.0.0.1:${address.port}`;

  assert.equal((await fetch(`${baseUrl}/health`)).status, 200);
  assert.equal((await fetch(`${baseUrl}/api/catalog`)).status, 401);
});

test("catalog accepts valid Telegram initData and rejects a tampered signature", async () => {
  const now = 2_000_000_000;
  app = await createApplication({
    botToken: syntheticToken,
    allowedTelegramUserId: syntheticUserId,
    nowSeconds: () => now,
    catalogLoader: async () => catalog,
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");
  const url = `http://127.0.0.1:${address.port}/api/catalog`;
  const valid = signedInitData(syntheticUserId, now);

  assert.equal((await fetch(url, { headers: { "X-Telegram-Init-Data": valid } })).status, 200);
  assert.equal((await fetch(url, { headers: { "X-Telegram-Init-Data": `${valid.slice(0, -1)}0` } })).status, 401);
});

test("catalog rejects correctly signed but stale Telegram initData", async () => {
  const now = 2_000_000_000;
  app = await createApplication({
    botToken: syntheticToken,
    allowedTelegramUserId: syntheticUserId,
    nowSeconds: () => now,
    telegramInitDataMaxAgeSeconds: 300,
    catalogLoader: async () => catalog,
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");

  const response = await fetch(`http://127.0.0.1:${address.port}/api/catalog`, {
    headers: { "X-Telegram-Init-Data": signedInitData(syntheticUserId, now - 301) },
  });
  assert.equal(response.status, 401);
});

test("catalog rejects valid Telegram initData for a user outside the allowlist", async () => {
  const now = 2_000_000_000;
  app = await createApplication({
    botToken: syntheticToken,
    allowedTelegramUserId: syntheticUserId,
    nowSeconds: () => now,
    catalogLoader: async () => catalog,
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");

  const response = await fetch(`http://127.0.0.1:${address.port}/api/pages/javascript-basics`, {
    headers: { "X-Telegram-Init-Data": signedInitData("10002", now) },
  });
  assert.equal(response.status, 403);
});

test("fixed HMAC vector accepts shuffled URL-encoded fields after decoding", async () => {
  const fixedVector = "user=%7B%22id%22%3A10001%2C%22first_name%22%3A%22Test%20User%22%7D&query_id=query%2F%2B%20decoded&auth_date=2000000000&hash=aa99954cbea35d5c05ae17e209692d911affed5529efc9bc58b4c442b9cb9acc";
  app = await createApplication({
    botToken: syntheticToken,
    allowedTelegramUserId: syntheticUserId,
    nowSeconds: () => 2_000_000_000,
    catalogLoader: async () => catalog,
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");

  const response = await fetch(`http://127.0.0.1:${address.port}/api/catalog`, {
    headers: { "X-Telegram-Init-Data": fixedVector },
  });
  assert.equal(response.status, 200);
});

test("catalog rejects signed future auth_date and malformed user ID", async () => {
  const now = 2_000_000_000;
  app = await createApplication({
    botToken: syntheticToken,
    allowedTelegramUserId: syntheticUserId,
    nowSeconds: () => now,
    catalogLoader: async () => catalog,
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");
  const url = `http://127.0.0.1:${address.port}/api/catalog`;

  assert.equal((await fetch(url, { headers: { "X-Telegram-Init-Data": signedInitData(syntheticUserId, now + 31) } })).status, 401);
  assert.equal((await fetch(url, { headers: { "X-Telegram-Init-Data": signedInitData("not-an-id", now) } })).status, 401);
});

test("catalog rejects duplicate initData keys before accepting their signature", async () => {
  const now = 2_000_000_000;
  app = await createApplication({
    botToken: syntheticToken,
    allowedTelegramUserId: syntheticUserId,
    nowSeconds: () => now,
    catalogLoader: async () => catalog,
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
    logger: false,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");
  const duplicate = `${signedInitData(syntheticUserId, now)}&auth_date=${now}`;

  const response = await fetch(`http://127.0.0.1:${address.port}/api/catalog`, {
    headers: { "X-Telegram-Init-Data": duplicate },
  });
  assert.equal(response.status, 401);
});

test("explicit AUTH_BYPASS=false keeps catalog authentication enabled", async () => {
  const previous = process.env.AUTH_BYPASS;
  process.env.AUTH_BYPASS = "false";
  try {
    app = await createApplication({
      botToken: syntheticToken,
      allowedTelegramUserId: syntheticUserId,
      catalogLoader: async () => catalog,
      telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
      logger: false,
    });
    await app.listen(0, "127.0.0.1");
    const address = app.getHttpServer().address();
    assert(address && typeof address === "object");

    assert.equal((await fetch(`http://127.0.0.1:${address.port}/api/catalog`)).status, 401);
  } finally {
    if (previous === undefined) delete process.env.AUTH_BYPASS;
    else process.env.AUTH_BYPASS = previous;
  }
});
