import { timingSafeEqual } from "node:crypto";

import { type ApiConfig, type ApiOptions, resolveConfig } from "./config.js";

export type BotStatus = "disabled" | "starting" | "running" | "error" | "stopped";

export interface TelegramUpdate {
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

export const WEBHOOK_PATH = "/api/telegram/webhook";

/**
 * Telegram integration with two delivery modes:
 * - `polling`: long-polls getUpdates. Telegram allows ONE poller per token, so
 *   run exactly one replica in this mode.
 * - `webhook`: Telegram pushes updates to WEBHOOK_PATH; any number of stateless
 *   replicas behind a load balancer can answer them.
 */
export class TelegramBotService {
  private status: BotStatus = "disabled";
  private abortController?: AbortController;
  private offset = 0;
  private startupNotificationDelivered = false;
  private runtimeManaged = false;
  private token = "";
  private publicUrl = "";
  private readonly config: ApiConfig;

  constructor(private readonly options: ApiOptions = {}, config?: ApiConfig) {
    this.config = config ?? resolveConfig(options);
  }

  getStatus(): BotStatus {
    return this.status;
  }

  get mode(): ApiConfig["botMode"] {
    return this.config.botMode;
  }

  onModuleInit(): void {
    this.runtimeManaged = true;
    if (this.config.botMode === "off" || !this.config.botToken) {
      this.status = "disabled";
      return;
    }
    this.startBot(this.config.botToken, this.config.publicUrl);
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
    if (this.config.botMode === "webhook" && !/^[A-Za-z0-9_-]{16,256}$/.test(this.config.webhookSecret)) {
      this.status = "error";
      return;
    }
    this.token = token;
    this.publicUrl = publicUrl;
    this.status = "starting";
    this.offset = 0;
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    void (this.config.botMode === "webhook" ? this.registerWebhook(signal) : this.poll(signal));
  }

  stopBot(): void {
    this.abortController?.abort();
    this.abortController = undefined;
    if (this.status !== "disabled") this.status = "stopped";
  }

  /** Constant-time check of Telegram's X-Telegram-Bot-Api-Secret-Token header. */
  isWebhookSecretValid(received: unknown): boolean {
    const expected = Buffer.from(this.config.webhookSecret);
    if (this.config.botMode !== "webhook" || !expected.length || typeof received !== "string") return false;
    const actual = Buffer.from(received);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }

  /** Processes one update; used by both the poller and the webhook controller. */
  async handleUpdate(update: TelegramUpdate, signal = this.abortController?.signal ?? AbortSignal.timeout(10_000)): Promise<void> {
    const message = update.message;
    const chatId = message?.chat?.id;
    if (chatId === undefined || !/^\/start(?:@\w+)?(?:\s|$)/.test(message?.text ?? "")) return;
    const fromId = message?.from?.id;
    const allowed = message?.chat?.type === "private" && fromId === chatId && this.isAllowedUser(fromId);
    await this.call("sendMessage", allowed ? {
      chat_id: chatId,
      text: "IT bilimlaringizni takrorlash portalini oching.",
      reply_markup: { inline_keyboard: [[{ text: "Portalni ochish", web_app: { url: this.publicUrl } }]] },
    } : {
      chat_id: chatId,
      text: "Bu bot shaxsiy foydalanish uchun yopiq.",
    }, signal);
  }

  private isAllowedUser(userId: number | undefined): boolean {
    if (userId === undefined) return false;
    return this.config.allowedUserIds.size === 0 || this.config.allowedUserIds.has(userId);
  }

  private isValidPublicUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  /** Default menu button for an open portal; per-chat buttons for an allowlist. */
  private async setupMenuButton(signal: AbortSignal): Promise<void> {
    const menuButton = { type: "web_app", text: "Portalni ochish", web_app: { url: this.publicUrl } };
    const chats = [...this.config.allowedUserIds];
    if (!chats.length) {
      await this.retrySetup("setChatMenuButton", { menu_button: menuButton }, signal);
      return;
    }
    for (const chatId of chats) await this.retrySetup("setChatMenuButton", { chat_id: chatId, menu_button: menuButton }, signal);
  }

  private async registerWebhook(signal: AbortSignal): Promise<void> {
    try {
      await this.setupMenuButton(signal);
      // Idempotent: every replica may call it on boot with identical arguments.
      await this.retrySetup("setWebhook", {
        url: new URL(WEBHOOK_PATH, this.publicUrl).toString(),
        secret_token: this.config.webhookSecret,
        allowed_updates: ["message"],
        max_connections: 100,
      }, signal);
      if (!signal.aborted) this.status = "running";
    } catch {
      if (!signal.aborted) this.status = "error";
    }
  }

  private async poll(signal: AbortSignal): Promise<void> {
    const baseRetryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
    let retryMs = baseRetryMs;
    try {
      await this.setupMenuButton(signal);
      await this.notifyStartup(signal);
      if (signal.aborted) return;
      this.status = "running";
      while (!signal.aborted) {
        try {
          const updates = await this.call<TelegramUpdate[]>("getUpdates", {
            offset: this.offset,
            timeout: 25,
            allowed_updates: ["message"],
          }, signal);
          retryMs = baseRetryMs;
          for (const update of updates) {
            await this.handleUpdate(update, signal);
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
    } catch {
      if (!signal.aborted) this.status = "error";
    }
  }

  private async notifyStartup(signal: AbortSignal): Promise<void> {
    const adminId = this.config.adminUserId;
    if (this.startupNotificationDelivered || adminId === undefined) return;
    const configuredAttempts = this.options.startupNotificationMaxAttempts;
    const maximumAttempts = typeof configuredAttempts === "number"
      && Number.isSafeInteger(configuredAttempts)
      && configuredAttempts > 0
      ? Math.min(configuredAttempts, 10)
      : 4;
    let retryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
    for (let attempt = 1; attempt <= maximumAttempts && !signal.aborted; attempt += 1) {
      try {
        await this.call("sendMessage", { chat_id: adminId, text: "Bilimxona ishga tushdi va foydalanishga tayyor." }, signal);
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

  private async retrySetup(method: string, body: Record<string, unknown>, signal: AbortSignal): Promise<void> {
    let retryMs = Math.max(1, this.options.botRetryBaseMs ?? 1_000);
    while (!signal.aborted) {
      try {
        await this.call(method, body, signal);
        return;
      } catch (error) {
        if (signal.aborted) throw error;
        if (isPermanentClientError(error)) throw error;
        await this.delay(retryMs, signal);
        retryMs = Math.min(retryMs * 2, 30_000);
      }
    }
  }

  private async call<T = unknown>(method: string, body: Record<string, unknown>, signal: AbortSignal): Promise<T> {
    const request = this.options.telegramFetch ?? fetch;
    const response = await request(`https://api.telegram.org/bot${this.token}/${method}`, {
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
