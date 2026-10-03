import type { LoggerService } from "@nestjs/common";

import type { ProgressStore } from "./progress.store.js";
import { parseTelegramUserId } from "./telegram-user-id.js";

export type BotMode = "polling" | "webhook" | "off";

/** Constructor-level overrides; anything omitted falls back to the environment. */
export interface ApiOptions {
  botToken?: string;
  botMode?: BotMode;
  webhookSecret?: string;
  /** Comma-separated Telegram user IDs, or "*" / empty for every signed Telegram user. */
  allowedTelegramUserIds?: string;
  /** Legacy single-user setting: used as both allowlist and admin when the newer settings are absent. */
  allowedTelegramUserId?: string;
  adminTelegramUserId?: string;
  authBypass?: boolean;
  telegramInitDataMaxAgeSeconds?: number;
  nowSeconds?: () => number;
  startupNotificationMaxAttempts?: number;
  publicUrl?: string;
  staticRoot?: string;
  redisUrl?: string;
  progressStore?: ProgressStore;
  logger?: LoggerService | false;
  telegramFetch?: typeof fetch;
  botRetryBaseMs?: number;
  botSleep?: (milliseconds: number, signal: AbortSignal) => Promise<void>;
  botEventLogger?: (event: string) => void;
}

export interface ApiConfig {
  production: boolean;
  botToken: string;
  botMode: BotMode;
  webhookSecret: string;
  publicUrl: string;
  /** Empty set means every user with valid Telegram initData is allowed. */
  allowedUserIds: ReadonlySet<number>;
  adminUserId?: number;
  authBypass: boolean;
  initDataMaxAgeSeconds: number;
  nowSeconds: () => number;
  redisUrl: string;
}

export const API_CONFIG = Symbol("API_CONFIG");

function parseUserIdList(raw: string): Set<number> {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "*") return new Set();
  const ids = trimmed.split(",").map((part) => parseTelegramUserId(part.trim()));
  if (ids.some((id) => id === undefined)) throw new Error("ALLOWED_TELEGRAM_USER_IDS must be '*' or comma-separated Telegram user IDs");
  return new Set(ids as number[]);
}

function parseBotMode(raw: string): BotMode {
  if (raw === "" || raw === "polling") return "polling";
  if (raw === "webhook" || raw === "off") return raw;
  throw new Error(`BOT_MODE must be polling, webhook or off (got "${raw}")`);
}

/** Docker Compose passes unset `${VAR:-}` values as "", which must not override a fallback. */
function setting(...candidates: Array<string | undefined>): string {
  return candidates.find((value) => value !== undefined && value.trim() !== "")?.trim() ?? "";
}

export function resolveConfig(options: ApiOptions, env: NodeJS.ProcessEnv = process.env): ApiConfig {
  const production = env.NODE_ENV === "production";
  // The legacy variable may hold one ID or a comma-separated list.
  const legacyUserIds = setting(options.allowedTelegramUserId, env.ALLOWED_TELEGRAM_USER_ID);
  const allowlistRaw = setting(options.allowedTelegramUserIds, env.ALLOWED_TELEGRAM_USER_IDS, legacyUserIds);
  const authBypass = options.authBypass ?? env.AUTH_BYPASS === "true";
  if (authBypass && production) throw new Error("AUTH_BYPASS=true is not allowed when NODE_ENV=production");
  const maxAge = options.telegramInitDataMaxAgeSeconds ?? Number(env.TELEGRAM_INIT_DATA_MAX_AGE_SECONDS ?? 86_400);
  return {
    production,
    botToken: options.botToken ?? setting(env.BOT_TOKEN),
    botMode: options.botMode ?? parseBotMode(setting(env.BOT_MODE)),
    webhookSecret: options.webhookSecret ?? setting(env.TELEGRAM_WEBHOOK_SECRET),
    publicUrl: options.publicUrl ?? setting(env.PUBLIC_URL),
    allowedUserIds: parseUserIdList(allowlistRaw),
    adminUserId: parseTelegramUserId(setting(options.adminTelegramUserId, env.ADMIN_TELEGRAM_USER_ID, legacyUserIds.split(",")[0])),
    authBypass,
    initDataMaxAgeSeconds: Number.isSafeInteger(maxAge) && maxAge > 0 ? maxAge : 86_400,
    nowSeconds: options.nowSeconds ?? (() => Math.floor(Date.now() / 1_000)),
    redisUrl: options.redisUrl ?? setting(env.REDIS_URL),
  };
}
