import { Body, Controller, ForbiddenException, Headers, HttpCode, Inject, Post } from "@nestjs/common";

import { type TelegramUpdate, TelegramBotService } from "./telegram-bot.service.js";

@Controller("api/telegram")
export class TelegramWebhookController {
  constructor(@Inject(TelegramBotService) private readonly bot: TelegramBotService) {}

  @Post("webhook")
  @HttpCode(200)
  async update(
    @Headers("x-telegram-bot-api-secret-token") secret: string | undefined,
    @Body() update: TelegramUpdate,
  ): Promise<{ ok: true }> {
    if (!this.bot.isWebhookSecretValid(secret)) throw new ForbiddenException();
    // A failed reply must not make Telegram redeliver the same update forever.
    await this.bot.handleUpdate(update, AbortSignal.timeout(10_000)).catch(() => undefined);
    return { ok: true };
  }
}
