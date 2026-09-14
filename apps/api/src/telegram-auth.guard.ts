import { createHmac, timingSafeEqual } from "node:crypto";
import { type CanActivate, type ExecutionContext, ForbiddenException, Injectable, UnauthorizedException, type Type } from "@nestjs/common";

import type { ApiOptions } from "./config.js";
import { parseTelegramUserId } from "./telegram-user-id.js";

export function makeTelegramAuthGuard(options: ApiOptions): Type<CanActivate> {
  class TelegramAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const bypass = options.authBypass ?? process.env.AUTH_BYPASS === "true";
      if (bypass) return true;
      const request = context.switchToHttp().getRequest<{ headers: Record<string, string | string[] | undefined> }>();
      const initData = request.headers["x-telegram-init-data"];
      if (typeof initData !== "string" || !initData) {
        throw new UnauthorizedException("Telegram Mini App orqali kiring");
      }
      const token = options.botToken ?? process.env.BOT_TOKEN ?? "";
      if (!token) throw new UnauthorizedException("Telegram kirish sozlanmagan");
      const fields = new URLSearchParams(initData);
      const keys = [...fields.keys()];
      if (new Set(keys).size !== keys.length) throw new UnauthorizedException("Telegram ma'lumoti yaroqsiz");
      const receivedHash = fields.get("hash") ?? "";
      if (!/^[a-f\d]{64}$/i.test(receivedHash)) throw new UnauthorizedException("Telegram ma'lumoti yaroqsiz");
      fields.delete("hash");
      const checkString = [...fields.entries()]
        .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");
      const secret = createHmac("sha256", "WebAppData").update(token).digest();
      const expectedHash = createHmac("sha256", secret).update(checkString).digest();
      const received = Buffer.from(receivedHash, "hex");
      if (received.length !== expectedHash.length || !timingSafeEqual(received, expectedHash)) {
        throw new UnauthorizedException("Telegram imzosi yaroqsiz");
      }
      const authDateRaw = fields.get("auth_date") ?? "";
      const authDate = Number(authDateRaw);
      const now = options.nowSeconds?.() ?? Math.floor(Date.now() / 1_000);
      const maxAge = Math.max(1, options.telegramInitDataMaxAgeSeconds ?? 300);
      if (!/^\d+$/.test(authDateRaw) || !Number.isSafeInteger(authDate) || authDate > now + 30 || now - authDate > maxAge) {
        throw new UnauthorizedException("Telegram sessiyasi eskirgan");
      }
      const allowedUserId = options.allowedTelegramUserId ?? process.env.ALLOWED_TELEGRAM_USER_ID ?? "";
      const parsedAllowedUserId = parseTelegramUserId(allowedUserId);
      if (parsedAllowedUserId === undefined) throw new UnauthorizedException("Telegram kirish sozlanmagan");
      let userId: unknown;
      try {
        userId = (JSON.parse(fields.get("user") ?? "null") as { id?: unknown } | null)?.id;
      } catch {
        throw new UnauthorizedException("Telegram foydalanuvchi ma'lumoti yaroqsiz");
      }
      const parsedUserId = typeof userId === "number" ? parseTelegramUserId(String(userId)) : undefined;
      if (parsedUserId === undefined) {
        throw new UnauthorizedException("Telegram foydalanuvchi ma'lumoti yaroqsiz");
      }
      if (parsedUserId !== parsedAllowedUserId) throw new ForbiddenException("Bu portal shaxsiy foydalanish uchun yopiq");
      return true;
    }
  }
  Injectable()(TelegramAuthGuard);
  return TelegramAuthGuard;
}
