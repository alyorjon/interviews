import { createHmac, timingSafeEqual } from "node:crypto";

import { parseTelegramUserId } from "./telegram-user-id.js";

export interface TelegramUser {
  id: number;
}

export class InitDataError extends Error {}

/**
 * Verifies Telegram Mini App initData as documented in
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 * and returns the signed user. Throws InitDataError with an Uzbek message.
 */
export function verifyInitData(
  initData: string,
  botToken: string,
  nowSeconds: number,
  maxAgeSeconds: number,
): TelegramUser {
  const fields = new URLSearchParams(initData);
  const keys = [...fields.keys()];
  if (new Set(keys).size !== keys.length) throw new InitDataError("Telegram ma'lumoti yaroqsiz");
  const receivedHash = fields.get("hash") ?? "";
  if (!/^[a-f\d]{64}$/i.test(receivedHash)) throw new InitDataError("Telegram ma'lumoti yaroqsiz");
  fields.delete("hash");
  const checkString = [...fields.entries()]
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secret = createHmac("sha256", "WebAppData").update(botToken).digest();
  const expectedHash = createHmac("sha256", secret).update(checkString).digest();
  const received = Buffer.from(receivedHash, "hex");
  if (received.length !== expectedHash.length || !timingSafeEqual(received, expectedHash)) {
    throw new InitDataError("Telegram imzosi yaroqsiz");
  }
  const authDateRaw = fields.get("auth_date") ?? "";
  const authDate = Number(authDateRaw);
  if (!/^\d+$/.test(authDateRaw) || !Number.isSafeInteger(authDate)
    || authDate > nowSeconds + 30 || nowSeconds - authDate > maxAgeSeconds) {
    throw new InitDataError("Telegram sessiyasi eskirgan");
  }
  let userId: unknown;
  try {
    userId = (JSON.parse(fields.get("user") ?? "null") as { id?: unknown } | null)?.id;
  } catch {
    throw new InitDataError("Telegram foydalanuvchi ma'lumoti yaroqsiz");
  }
  const id = typeof userId === "number" ? parseTelegramUserId(String(userId)) : undefined;
  if (id === undefined) throw new InitDataError("Telegram foydalanuvchi ma'lumoti yaroqsiz");
  return { id };
}
