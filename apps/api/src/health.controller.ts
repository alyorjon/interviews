import { Controller, Get, type Type } from "@nestjs/common";

import { TelegramBotService } from "./telegram-bot.service.js";

export interface HealthResponse {
  status: "ok";
  service: "interviews-api";
  bot: { status: ReturnType<TelegramBotService["getStatus"]> };
}

export function makeHealthController(bot: TelegramBotService): Type<unknown> {
  class HealthController {
    health(): HealthResponse {
      return {
        status: "ok",
        service: "interviews-api",
        bot: { status: bot.getStatus() },
      };
    }
  }
  Controller("health")(HealthController);
  Get()(HealthController.prototype, "health", Object.getOwnPropertyDescriptor(HealthController.prototype, "health")!);
  return HealthController;
}
