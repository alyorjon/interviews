import assert from "node:assert/strict";
import { test } from "node:test";

import { TelegramBotService } from "../src/telegram-bot.service.js";

async function waitFor(predicate: () => boolean): Promise<void> {
  const deadline = Date.now() + 1_000;
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error("Telegram mock chaqiruvi kutilgan vaqtda kelmadi");
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

test("startup and /start expose the Web App only to the allowlisted private chat", async () => {
  const calls: Array<{ method: string; body: Record<string, unknown> }> = [];
  let updatePolls = 0;
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    calls.push({ method, body });
    if (method === "getUpdates" && updatePolls++ === 0) {
      return new Response(JSON.stringify({
        ok: true,
        result: [
          { update_id: 41, message: { from: { id: 70001 }, chat: { id: 70001, type: "private" }, text: "/start" } },
          { update_id: 42, message: { from: { id: 70002 }, chat: { id: 70002, type: "private" }, text: "/start" } },
        ],
      }), { status: 200 });
    }
    if (method === "getUpdates") {
      return await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    }
    return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
  };
  const bot = new TelegramBotService({ allowedTelegramUserId: "70001", telegramFetch, botRetryBaseMs: 1 });

  bot.startBot("synthetic-token", "https://interviews.example.com");
  await waitFor(() => calls.filter((call) => call.method === "sendMessage").length === 3);
  bot.stopBot();

  const menu = calls.find((call) => call.method === "setChatMenuButton")!;
  const messages = calls.filter((call) => call.method === "sendMessage");
  assert.deepEqual(menu.body, {
    chat_id: 70001,
    menu_button: { type: "web_app", text: "Portalni ochish", web_app: { url: "https://interviews.example.com" } },
  });
  assert.deepEqual(messages[0]?.body, {
    chat_id: 70001,
    text: "Bilimxona ishga tushdi va foydalanishga tayyor.",
  });
  assert.deepEqual(messages[1]?.body, {
    chat_id: 70001,
    text: "IT bilimlaringizni takrorlash portalini oching.",
    reply_markup: {
      inline_keyboard: [[{ text: "Portalni ochish", web_app: { url: "https://interviews.example.com" } }]],
    },
  });
  assert.deepEqual(messages[2]?.body, {
    chat_id: 70002,
    text: "Bu bot shaxsiy foydalanish uchun yopiq.",
  });
  assert.equal(JSON.stringify(messages[2]?.body).includes("interviews.example.com"), false);
});

test("transient long-polling failures retry with backoff", async () => {
  let updatePolls = 0;
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    if (method !== "getUpdates") {
      return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
    }
    updatePolls += 1;
    if (updatePolls === 1) {
      return new Response(JSON.stringify({ ok: false, error_code: 503 }), { status: 503 });
    }
    if (updatePolls === 2) {
      return new Response(JSON.stringify({ ok: true, result: [] }), { status: 200 });
    }
    return await new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
    });
  };
  const bot = new TelegramBotService({ allowedTelegramUserId: "70001", telegramFetch, botRetryBaseMs: 1 });

  bot.startBot("test-token", "https://interviews.example.com");
  await waitFor(() => updatePolls >= 3);

  assert.equal(bot.getStatus(), "running");
  bot.stopBot();
});

test("transient menu setup failure also retries", async () => {
  let menuCalls = 0;
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    if (method === "setChatMenuButton" && ++menuCalls === 1) {
      return new Response(JSON.stringify({ ok: false, error_code: 502 }), { status: 502 });
    }
    if (method === "getUpdates") {
      return await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    }
    return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
  };
  const bot = new TelegramBotService({ allowedTelegramUserId: "70001", telegramFetch, botRetryBaseMs: 1 });

  bot.startBot("test-token", "https://interviews.example.com");
  await waitFor(() => menuCalls === 2);

  assert.equal(bot.getStatus(), "running");
  bot.stopBot();
});

test("startup notification retries with bounded backoff and stops after its first success", async () => {
  let startupAttempts = 0;
  let startupSuccesses = 0;
  let updatePolls = 0;
  const delays: number[] = [];
  const events: string[] = [];
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    const body = JSON.parse(String(init?.body)) as { text?: string };
    if (method === "sendMessage" && body.text === "Bilimxona ishga tushdi va foydalanishga tayyor.") {
      startupAttempts += 1;
      if (startupAttempts < 3) return new Response(JSON.stringify({ ok: false, error_code: 503 }), { status: 503 });
      startupSuccesses += 1;
      return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
    }
    if (method === "getUpdates") {
      updatePolls += 1;
      return await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    }
    return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
  };
  const bot = new TelegramBotService({
    allowedTelegramUserId: "70001",
    telegramFetch,
    botRetryBaseMs: 2,
    startupNotificationMaxAttempts: 4,
    botSleep: async milliseconds => { delays.push(milliseconds); },
    botEventLogger: event => { events.push(event); },
  });

  bot.startBot("synthetic-token", "https://interviews.example.com");
  await waitFor(() => updatePolls === 1);
  bot.stopBot();
  bot.startBot("synthetic-token", "https://interviews.example.com");
  await waitFor(() => updatePolls === 2);
  bot.stopBot();

  assert.equal(startupAttempts, 3);
  assert.equal(startupSuccesses, 1);
  assert.deepEqual(delays, [2, 4]);
  assert.deepEqual(events, ["telegram_startup_notification_delivered"]);
});

test("startup notification stops at the configured retry limit and polling remains available", async () => {
  let startupAttempts = 0;
  let updatePolls = 0;
  const delays: number[] = [];
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    const body = JSON.parse(String(init?.body)) as { text?: string };
    if (method === "sendMessage" && body.text === "Bilimxona ishga tushdi va foydalanishga tayyor.") {
      startupAttempts += 1;
      return new Response(JSON.stringify({ ok: false, error_code: 503 }), { status: 503 });
    }
    if (method === "getUpdates") {
      updatePolls += 1;
      return await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    }
    return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
  };
  const bot = new TelegramBotService({
    allowedTelegramUserId: "70001",
    telegramFetch,
    botRetryBaseMs: 3,
    startupNotificationMaxAttempts: 3,
    botSleep: async milliseconds => { delays.push(milliseconds); },
  });

  bot.startBot("synthetic-token", "https://interviews.example.com");
  await waitFor(() => updatePolls === 1);
  bot.stopBot();

  assert.equal(startupAttempts, 3);
  assert.deepEqual(delays, [3, 6]);
});

test("a transient sendMessage failure does not lose the /start update", async () => {
  let startReplyCalls = 0;
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    const body = JSON.parse(String(init?.body)) as { offset?: number; text?: string };
    if (method === "getUpdates" && body.offset === 0) {
      return new Response(JSON.stringify({
        ok: true,
        result: [{ update_id: 9, message: { from: { id: 70001 }, chat: { id: 70001, type: "private" }, text: "/start" } }],
      }), { status: 200 });
    }
    if (method === "getUpdates") {
      return await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    }
    if (method === "sendMessage" && body.text === "IT bilimlaringizni takrorlash portalini oching.") {
      startReplyCalls += 1;
      if (startReplyCalls === 1) return new Response(JSON.stringify({ ok: false, error_code: 503 }), { status: 503 });
    }
    return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
  };
  const bot = new TelegramBotService({ allowedTelegramUserId: "70001", telegramFetch, botRetryBaseMs: 1 });

  bot.startBot("test-token", "https://interviews.example.com");
  await waitFor(() => startReplyCalls === 2);

  assert.equal(bot.getStatus(), "running");
  bot.stopBot();
});

test("a permanent non-rate-limit 4xx safely disables polling", async () => {
  let calls = 0;
  const telegramFetch: typeof fetch = async () => {
    calls += 1;
    return new Response(JSON.stringify({ ok: false, error_code: 404 }), { status: 404 });
  };
  const bot = new TelegramBotService({ allowedTelegramUserId: "70001", telegramFetch, botRetryBaseMs: 1 });

  bot.startBot("test-token", "https://interviews.example.com");
  await new Promise((resolve) => setTimeout(resolve, 20));
  const status = bot.getStatus();
  bot.stopBot();

  assert.equal(status, "error");
  assert.equal(calls, 1);
});

test("successive transient failures use increasing backoff", async () => {
  const delays: number[] = [];
  let updatePolls = 0;
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    if (method !== "getUpdates") return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
    updatePolls += 1;
    if (updatePolls <= 2) return new Response(JSON.stringify({ ok: false, error_code: 503 }), { status: 503 });
    return await new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
    });
  };
  const bot = new TelegramBotService({
    allowedTelegramUserId: "70001",
    telegramFetch,
    botRetryBaseMs: 2,
    botSleep: async (milliseconds) => { delays.push(milliseconds); },
  });

  bot.startBot("test-token", "https://interviews.example.com");
  await waitFor(() => updatePolls === 3);
  bot.stopBot();

  assert.deepEqual(delays, [2, 4]);
});

test("stopBot aborts the active request and polling stays quiescent", async () => {
  let calls = 0;
  const telegramFetch: typeof fetch = async (input, init) => {
    calls += 1;
    const method = String(input).split("/").at(-1)!;
    if (method !== "getUpdates") return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
    return await new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
    });
  };
  const bot = new TelegramBotService({ allowedTelegramUserId: "70001", telegramFetch, botRetryBaseMs: 1 });

  bot.startBot("test-token", "https://interviews.example.com");
  await waitFor(() => calls >= 3);
  bot.stopBot();
  const callsAtStop = calls;
  await new Promise((resolve) => setTimeout(resolve, 20));

  assert.equal(bot.getStatus(), "stopped");
  assert.equal(calls, callsAtStop);
});

test("an open portal uses the default menu button and answers any private /start", async () => {
  const calls: Array<{ method: string; body: Record<string, unknown> }> = [];
  let updatePolls = 0;
  const telegramFetch: typeof fetch = async (input, init) => {
    const method = String(input).split("/").at(-1)!;
    calls.push({ method, body: JSON.parse(String(init?.body)) as Record<string, unknown> });
    if (method === "getUpdates" && updatePolls++ === 0) {
      return new Response(JSON.stringify({ ok: true, result: [
        { update_id: 7, message: { from: { id: 424242 }, chat: { id: 424242, type: "private" }, text: "/start" } },
        { update_id: 8, message: { from: { id: 424242 }, chat: { id: -100, type: "group" }, text: "/start" } },
      ] }), { status: 200 });
    }
    if (method === "getUpdates") {
      return await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    }
    return new Response(JSON.stringify({ ok: true, result: true }), { status: 200 });
  };
  const bot = new TelegramBotService({ allowedTelegramUserIds: "*", telegramFetch, botRetryBaseMs: 1 });

  bot.startBot("synthetic-token", "https://interviews.example.com");
  await waitFor(() => calls.filter((call) => call.method === "sendMessage").length === 2);
  bot.stopBot();

  assert.equal(calls.find((call) => call.method === "setChatMenuButton")?.body.chat_id, undefined);
  const [privateReply, groupReply] = calls.filter((call) => call.method === "sendMessage");
  assert.equal(privateReply?.body.chat_id, 424242);
  assert.ok(privateReply?.body.reply_markup);
  assert.equal(groupReply?.body.reply_markup, undefined, "group chats never receive the Web App button");
});
