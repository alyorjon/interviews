import { Controller, Get, Inject, ServiceUnavailableException } from "@nestjs/common";

import { PROGRESS_STORE, type ProgressStore } from "./progress.store.js";
import { type BotStatus, TelegramBotService } from "./telegram-bot.service.js";

export interface HealthResponse {
  status: "ok";
  service: "interviews-api";
  bot: { status: BotStatus };
}

@Controller("health")
export class HealthController {
  constructor(
    @Inject(TelegramBotService) private readonly bot: TelegramBotService,
    @Inject(PROGRESS_STORE) private readonly store: ProgressStore,
  ) {}

  /** Liveness: the process is up. Never depends on external services. */
  @Get()
  health(): HealthResponse {
    return { status: "ok", service: "interviews-api", bot: { status: this.bot.getStatus() } };
  }

  /** Readiness: a load balancer should only route here when storage answers. */
  @Get("ready")
  async ready(): Promise<{ status: "ready" }> {
    if (!await this.store.ping()) throw new ServiceUnavailableException("progress store unavailable");
    return { status: "ready" };
  }
}
