import type { ApiOptions } from "./config.js";
import { parseTelegramUserId } from "./telegram-user-id.js";

export type BotStatus = "disabled" | "starting" | "running" | "error" | "stopped";

interface TelegramUpdate {
  update_id: number;
  message?: { from?: { id?: number }; chat?: { id?: number; type?: string }; text?: string };
}

interface TelegramEnvelope<T> {
  ok: boolean;
  result?: T;
  error_code?: number;
}

class TelegramCallError extends Error {
  constructor(readonly status: number) {
    super("Telegram API request failed");
  }
}

function isPermanentClientError(error: unknown): error is TelegramCallError {
  return error instanceof TelegramCallError && error.status >= 400 && error.status < 500 && error.status !== 429;
}

export class TelegramBotService {
  private status: BotStatus = "disabled";
  private abortController?: AbortController;
  private offset = 0;
  private startupNotificationDelivered = false;
  private runtimeManaged = false;

  constructor(private readonly options: ApiOptions) {}

  getStatus(): BotStatus {
    return this.status;
  }

  onModuleInit(): void {
    this.runtimeManaged = true;
    const token = this.options.botToken ?? process.env.BOT_TOKEN ?? "";
    const publicUrl = this.options.publicUrl ?? process.env.PUBLIC_URL ?? "";
    if (!token.trim()) {
      this.status = "disabled";
      return;
    }
    this.startBot(token, publicUrl);
  }

  onModuleDestroy(): void {
    this.stopBot();
  }

  startBot(token: string, publicUrl: string): void {
    this.abortController?.abort();
    if (!token.trim()) {
      this.status = "disabled";
      return;
    }
    if (!this.isValidPublicUrl(publicUrl)) {
      this.status = "error";
      return;
    }
    const allowedUserId = this.allowedUserId();
    if (allowedUserId === undefined) {
      this.status = "error";
      return;
    }
    this.status = "starting";
    this.offset = 0;
    this.abortController = new AbortController();
    void this.poll(token, publicUrl, allowedUserId, this.abortController.signal);
  }

  stopBot(): void {
    this.abortController?.abort();
    this.abortController = undefined;
    if (this.status !== "disabled") this.status = "stopped";
  }

  private isValidPublicUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  private allowedUserId(): number | undefined {
    const raw = this.options.allowedTelegramUserId ?? process.env.ALLOWED_TELEGRAM_USER_ID ?? "";
    return parseTelegramUserId(raw);
  }

  private async poll(token: string, publicUrl: string, allowedUserId: number, signal: AbortSignal): Promise<void> {
    let retryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
    try {
      await this.retrySetup(token, "setChatMenuButton", {
        chat_id: allowedUserId,
        menu_button: { type: "web_app", text: "Portalni ochish", web_app: { url: publicUrl } },
      }, signal);
      await this.notifyStartup(token, allowedUserId, signal);
      if (signal.aborted) return;
      this.status = "running";
      retryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
      while (!signal.aborted) {
        try {
          const updates = await this.call<TelegramUpdate[]>(token, "getUpdates", {
            offset: this.offset,
            timeout: 25,
            allowed_updates: ["message"],
          }, signal);
          retryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
          for (const update of updates) {
            const chatId = update.message?.chat?.id;
            if (chatId !== undefined && /^\/start(?:@\w+)?(?:\s|$)/.test(update.message?.text ?? "")) {
              const isAllowedPrivateChat = chatId === allowedUserId
                && update.message?.from?.id === allowedUserId
                && update.message?.chat?.type === "private";
              await this.call(token, "sendMessage", isAllowedPrivateChat ? {
                  chat_id: chatId,
                  text: "IT bilimlaringizni takrorlash portalini oching.",
                  reply_markup: {
                    inline_keyboard: [[{ text: "Portalni ochish", web_app: { url: publicUrl } }]],
                  },
                } : {
                  chat_id: chatId,
                  text: "Bu bot shaxsiy foydalanish uchun yopiq.",
                }, signal);
            }
            this.offset = Math.max(this.offset, update.update_id + 1);
          }
        } catch (error) {
          if (signal.aborted) return;
          if (isPermanentClientError(error)) {
            this.status = "error";
            return;
          }
          await this.delay(retryMs, signal);
          retryMs = Math.min(retryMs * 2, 30_000);
        }
      }
    } catch (error) {
      if (!signal.aborted) this.status = "error";
    }
  }

  private async notifyStartup(token: string, allowedUserId: number, signal: AbortSignal): Promise<void> {
    if (this.startupNotificationDelivered) return;
    const configuredAttempts = this.options.startupNotificationMaxAttempts;
    const maximumAttempts = typeof configuredAttempts === "number"
      && Number.isSafeInteger(configuredAttempts)
      && configuredAttempts > 0
      ? Math.min(configuredAttempts, 10)
      : 4;
    let retryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
    for (let attempt = 1; attempt <= maximumAttempts && !signal.aborted; attempt += 1) {
      try {
        await this.call(token, "sendMessage", {
          chat_id: allowedUserId,
          text: "Bilimxona ishga tushdi va foydalanishga tayyor.",
        }, signal);
        this.startupNotificationDelivered = true;
        this.emitEvent("telegram_startup_notification_delivered");
        return;
      } catch (error) {
        if (signal.aborted) throw error;
        if (isPermanentClientError(error)) throw error;
        if (attempt === maximumAttempts) return;
        await this.delay(retryMs, signal);
        retryMs = Math.min(retryMs * 2, 30_000);
      }
    }
  }

  private emitEvent(event: string): void {
    if (this.options.botEventLogger) {
      this.options.botEventLogger(event);
      return;
    }
    if (this.runtimeManaged) console.info(event);
  }

  private async retrySetup(token: string, method: string, body: Record<string, unknown>, signal: AbortSignal): Promise<void> {
    let retryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
    while (!signal.aborted) {
      try {
        await this.call(token, method, body, signal);
        return;
      } catch (error) {
        if (signal.aborted) throw error;
        if (isPermanentClientError(error)) throw error;
        await this.delay(retryMs, signal);
        retryMs = Math.min(retryMs * 2, 30_000);
      }
    }
  }

  private async call<T = unknown>(token: string, method: string, body: Record<string, unknown>, signal: AbortSignal): Promise<T> {
    const request = this.options.telegramFetch ?? fetch;
    const response = await request(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
    let envelope: TelegramEnvelope<T> | undefined;
    try {
      envelope = await response.json() as TelegramEnvelope<T>;
    } catch {
      throw new TelegramCallError(response.status || 502);
    }
    if (!response.ok || !envelope.ok) throw new TelegramCallError(envelope.error_code ?? response.status);
    return envelope.result as T;
  }

  private delay(milliseconds: number, signal: AbortSignal): Promise<void> {
    if (this.options.botSleep) return this.options.botSleep(milliseconds, signal);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, milliseconds);
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(signal.reason);
      }, { once: true });
    });
  }
}
