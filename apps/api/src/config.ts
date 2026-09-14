import type { LoggerService } from "@nestjs/common";
import type { Catalog } from "@interviews/content";

export interface ApiOptions {
  botToken?: string;
  allowedTelegramUserId?: string;
  authBypass?: boolean;
  telegramInitDataMaxAgeSeconds?: number;
  nowSeconds?: () => number;
  startupNotificationMaxAttempts?: number;
  publicUrl?: string;
  contentRoot?: string;
  catalogPath?: string;
  staticRoot?: string;
  logger?: LoggerService | false;
  telegramFetch?: typeof fetch;
  botRetryBaseMs?: number;
  botSleep?: (milliseconds: number, signal: AbortSignal) => Promise<void>;
  botEventLogger?: (event: string) => void;
  catalogLoader?: () => Promise<Catalog>;
}
