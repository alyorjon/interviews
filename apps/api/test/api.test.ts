import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";

import type { INestApplication } from "@nestjs/common";

import { createApplication } from "../src/app.js";
import type { ApiOptions } from "../src/config.js";
import { MemoryProgressStore, type ProgressStore, StoreUnavailableError } from "../src/progress.store.js";

let app: INestApplication | undefined;
const syntheticToken = "123456:synthetic-secret";
const syntheticUserId = "10001";
const now = 2_000_000_000;
const cardA = "card-aaaaaaaaaaaaaaaaaaaa";
const cardB = "card-bbbbbbbbbbbbbbbbbbbb";

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

/** Starts an app on a random port with the bot off unless the test opts in. */
async function start(options: ApiOptions = {}): Promise<string> {
  app = await createApplication({
    botToken: syntheticToken,
    botMode: "off",
    nowSeconds: () => now,
    progressStore: new MemoryProgressStore(),
    logger: false,
    ...options,
  });
  await app.listen(0, "127.0.0.1");
  const address = app.getHttpServer().address();
  assert(address && typeof address === "object");
  return `http://127.0.0.1:${address.port}`;
}

function authed(userId = syntheticUserId, authDate = now): Record<string, string> {
  return { "X-Telegram-Init-Data": signedInitData(userId, authDate) };
}

async function putProgress(baseUrl: string, body: unknown, headers = authed()): Promise<Response> {
  return fetch(`${baseUrl}/api/me/progress`, {
    method: "PUT",
    headers: { ...headers, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

afterEach(async () => {
  await app?.close();
  app = undefined;
});

test("GET /health reports a healthy API when the Telegram bot is disabled", async () => {
  const baseUrl = await start({ botToken: "" });
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", service: "interviews-api", bot: { status: "disabled" } });
});

test("readiness follows the progress store instead of process liveness", async () => {
  let healthy = true;
  const store: ProgressStore = Object.assign(new MemoryProgressStore(), { ping: async () => healthy });
  const baseUrl = await start({ progressStore: store });
  assert.equal((await fetch(`${baseUrl}/health/ready`)).status, 200);
  healthy = false;
  assert.equal((await fetch(`${baseUrl}/health/ready`)).status, 503);
  assert.equal((await fetch(`${baseUrl}/health`)).status, 200);
});

test("production service serves the Vite build with CDN-friendly cache headers", async () => {
  const staticRoot = await mkdtemp(path.join(tmpdir(), "interviews-web-"));
  await mkdir(path.join(staticRoot, "assets"));
  await mkdir(path.join(staticRoot, "data", "pages"), { recursive: true });
  await writeFile(path.join(staticRoot, "index.html"), "<!doctype html><title>Interview Portal</title>", "utf8");
  await writeFile(path.join(staticRoot, "assets", "app.js"), "globalThis.portalReady=true;", "utf8");
  await writeFile(path.join(staticRoot, "data", "manifest.json"), "{}", "utf8");
  await writeFile(path.join(staticRoot, "data", "pages", "js.0123456789ab.json"), "{}", "utf8");
  try {
    const baseUrl = await start({ botToken: "", staticRoot });

    const entry = await fetch(`${baseUrl}/`);
    assert.equal(entry.status, 200);
    assert.match(await entry.text(), /Interview Portal/);
    assert.equal(entry.headers.get("cache-control"), "no-cache");
    const csp = entry.headers.get("content-security-policy") ?? "";
    assert.match(csp, /frame-ancestors[^;]*telegram\.org/);
    assert.doesNotMatch(csp, /script-src[^;]*unsafe-inline/, "scripts must not need 'unsafe-inline'");
    const nonce = csp.match(/'nonce-([A-Za-z0-9+/=]+)'/)?.[1];
    assert.ok(nonce, "CDN-injected scripts need a per-response nonce");
    const again = (await fetch(`${baseUrl}/`)).headers.get("content-security-policy") ?? "";
    assert.notEqual(again.match(/'nonce-([^']+)'/)?.[1], nonce, "the nonce must change on every response");

    const asset = await fetch(`${baseUrl}/assets/app.js`);
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get("content-type") ?? "", /javascript/);
    assert.match(asset.headers.get("cache-control") ?? "", /immutable/);

    assert.match((await fetch(`${baseUrl}/data/manifest.json`)).headers.get("cache-control") ?? "", /max-age=60/);
    assert.match((await fetch(`${baseUrl}/data/pages/js.0123456789ab.json`)).headers.get("cache-control") ?? "", /immutable/);
    assert.equal((await fetch(`${baseUrl}/data/pages/missing.json`)).status, 404, "missing shards must not fall back to HTML");

    for (const route of ["/topics/javascript", "/study/session/today"]) {
      const deepLink = await fetch(`${baseUrl}${route}`);
      assert.equal(deepLink.status, 200);
      assert.match(deepLink.headers.get("content-type") ?? "", /text\/html/);
    }

    const unknownApi = await fetch(`${baseUrl}/api/not-a-route`, { headers: { accept: "text/html" } });
    assert.equal(unknownApi.status, 404);
    assert.doesNotMatch(await unknownApi.text(), /Interview Portal/);
  } finally {
    await app?.close();
    app = undefined;
    await rm(staticRoot, { recursive: true, force: true });
  }
});

test("an invalid BOT_TOKEN leaves API health available", async () => {
  const baseUrl = await start({
    botToken: "invalid-test-token",
    botMode: "polling",
    allowedTelegramUserId: syntheticUserId,
    publicUrl: "https://interviews.example.com",
    telegramFetch: async () => new Response(JSON.stringify({ ok: false, error_code: 401 }), { status: 401 }),
  });
  await new Promise((resolve) => setTimeout(resolve, 5));
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", service: "interviews-api", bot: { status: "error" } });
});

test("progress is per signed user, merged, and never cached", async () => {
  const baseUrl = await start({ allowedTelegramUserIds: "*" });
  assert.deepEqual(await (await fetch(`${baseUrl}/api/me/progress`, { headers: authed() })).json(), { scores: {} });

  assert.equal((await putProgress(baseUrl, { scores: { [cardA]: 4 } })).status, 200);
  const merged = await putProgress(baseUrl, { scores: { [cardB]: 9 } });
  assert.equal(merged.headers.get("cache-control"), "no-store");
  assert.deepEqual(await merged.json(), { scores: { [cardA]: 4, [cardB]: 9 } });

  const other = await fetch(`${baseUrl}/api/me/progress`, { headers: authed("10002") });
  assert.deepEqual(await other.json(), { scores: {} }, "another user must not see this user's progress");
});

test("progress rejects malformed scores", async () => {
  const baseUrl = await start();
  for (const body of [
    {}, { scores: [] }, { scores: {} }, { scores: { [cardA]: 0 } }, { scores: { [cardA]: 11 } },
    { scores: { [cardA]: 2.5 } }, { scores: { "not-a-card": 5 } },
    { scores: Object.fromEntries(Array.from({ length: 501 }, (_, index) => [`card-${String(index).padStart(20, "0")}`, 5])) },
  ]) {
    assert.equal((await putProgress(baseUrl, body)).status, 400, JSON.stringify(body).slice(0, 60));
  }
});

test("an unavailable progress store answers 503 quickly instead of hanging", async () => {
  const down: ProgressStore = {
    get: async () => { throw new StoreUnavailableError(); },
    merge: async () => { throw new StoreUnavailableError(); },
    ping: async () => false,
    close: async () => undefined,
  };
  const baseUrl = await start({ progressStore: down });
  assert.equal((await fetch(`${baseUrl}/api/me/progress`, { headers: authed() })).status, 503);
  assert.equal((await putProgress(baseUrl, { scores: { [cardA]: 3 } })).status, 503);
  assert.equal((await fetch(`${baseUrl}/health/ready`)).status, 503);
});

test("progress requires Telegram initData while health stays public", async () => {
  const baseUrl = await start();
  assert.equal((await fetch(`${baseUrl}/health`)).status, 200);
  assert.equal((await fetch(`${baseUrl}/api/me/progress`)).status, 401);
});

test("valid initData is accepted and a tampered signature is rejected", async () => {
  const baseUrl = await start();
  const valid = signedInitData(syntheticUserId, now);
  const url = `${baseUrl}/api/me/progress`;
  assert.equal((await fetch(url, { headers: { "X-Telegram-Init-Data": valid } })).status, 200);
  assert.equal((await fetch(url, { headers: { "X-Telegram-Init-Data": `${valid.slice(0, -1)}0` } })).status, 401);
});

test("initData stays valid for a normal study session but expires after the configured window", async () => {
  const baseUrl = await start();
  const url = `${baseUrl}/api/me/progress`;
  // Telegram signs initData once when the Mini App opens; a 5-minute window logged users out mid-session.
  assert.equal((await fetch(url, { headers: authed(syntheticUserId, now - 3 * 60 * 60) })).status, 200);
  assert.equal((await fetch(url, { headers: authed(syntheticUserId, now - 86_401) })).status, 401);
});

test("a configured allowlist rejects other signed users with 403", async () => {
  const baseUrl = await start({ allowedTelegramUserIds: `${syntheticUserId},10003` });
  const url = `${baseUrl}/api/me/progress`;
  assert.equal((await fetch(url, { headers: authed("10003") })).status, 200);
  assert.equal((await fetch(url, { headers: authed("10002") })).status, 403);
});

test("an open portal accepts any signed Telegram user", async () => {
  const baseUrl = await start({ allowedTelegramUserIds: "*" });
  assert.equal((await fetch(`${baseUrl}/api/me/progress`, { headers: authed("987654321") })).status, 200);
});

test("fixed HMAC vector accepts shuffled URL-encoded fields after decoding", async () => {
  const fixedVector = "user=%7B%22id%22%3A10001%2C%22first_name%22%3A%22Test%20User%22%7D&query_id=query%2F%2B%20decoded&auth_date=2000000000&hash=aa99954cbea35d5c05ae17e209692d911affed5529efc9bc58b4c442b9cb9acc";
  const baseUrl = await start();
  assert.equal((await fetch(`${baseUrl}/api/me/progress`, { headers: { "X-Telegram-Init-Data": fixedVector } })).status, 200);
});

test("signed future auth_date, malformed user ID and duplicate keys are rejected", async () => {
  const baseUrl = await start();
  const url = `${baseUrl}/api/me/progress`;
  assert.equal((await fetch(url, { headers: authed(syntheticUserId, now + 31) })).status, 401);
  assert.equal((await fetch(url, { headers: authed("not-an-id") })).status, 401);
  const duplicate = `${signedInitData(syntheticUserId, now)}&auth_date=${now}`;
  assert.equal((await fetch(url, { headers: { "X-Telegram-Init-Data": duplicate } })).status, 401);
});

test("AUTH_BYPASS maps to a development user and is refused in production", async () => {
  const baseUrl = await start({ authBypass: true });
  assert.equal((await putProgress(baseUrl, { scores: { [cardA]: 7 } }, {})).status, 200);
  await app?.close();
  app = undefined;

  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    await assert.rejects(createApplication({ authBypass: true, logger: false }), /AUTH_BYPASS/);
  } finally {
    if (previous === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previous;
  }
});

test("webhook mode accepts updates only with Telegram's secret header", async () => {
  const calls: Array<{ method: string; body: Record<string, unknown> }> = [];
  const telegramFetch: typeof fetch = async (input, init) => {
    calls.push({ method: String(input).split("/").at(-1)!, body: JSON.parse(String(init?.body)) as Record<string, unknown> });
    return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
  };
  const secret = "webhook-secret-0123456789";
  const baseUrl = await start({
    botMode: "webhook", webhookSecret: secret, publicUrl: "https://interviews.example.com", telegramFetch,
    allowedTelegramUserIds: "*",
  });
  const update = { update_id: 1, message: { from: { id: 555 }, chat: { id: 555, type: "private" }, text: "/start" } };
  const post = (headers: Record<string, string>) => fetch(`${baseUrl}/api/telegram/webhook`, {
    method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(update),
  });

  // Registration runs in the background after boot.
  for (let waited = 0; !calls.some((call) => call.method === "setWebhook"); waited += 5) {
    assert.ok(waited < 1_000, "setWebhook was never called");
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  assert.equal((await post({})).status, 403);
  assert.equal((await post({ "X-Telegram-Bot-Api-Secret-Token": "wrong-secret-0123456789" })).status, 403);
  assert.equal((await post({ "X-Telegram-Bot-Api-Secret-Token": secret })).status, 200);

  const webhook = calls.find((call) => call.method === "setWebhook");
  assert.deepEqual(webhook?.body, {
    url: "https://interviews.example.com/api/telegram/webhook",
    secret_token: secret,
    allowed_updates: ["message"],
    max_connections: 100,
  });
  const reply = calls.find((call) => call.method === "sendMessage");
  assert.equal(reply?.body.chat_id, 555);
  assert.ok(reply?.body.reply_markup, "an open portal gives every private /start the Web App button");
  assert.equal(calls.some((call) => call.method === "getUpdates"), false, "webhook replicas must never long-poll");
});
