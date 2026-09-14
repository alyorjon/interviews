import "reflect-metadata";

import path from "node:path";

import { Module, type INestApplication, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { makeCatalogController } from "./catalog.controller.js";
import { CatalogStore } from "./catalog.store.js";
import type { ApiOptions } from "./config.js";
import { makeHealthController } from "./health.controller.js";
import { TelegramBotService } from "./telegram-bot.service.js";
import { makeTelegramAuthGuard } from "./telegram-auth.guard.js";

export async function createApplication(options: ApiOptions = {}): Promise<INestApplication> {
  const bot = new TelegramBotService(options);
  const catalogStore = new CatalogStore(options);
  const HealthController = makeHealthController(bot);
  const TelegramAuthGuard = makeTelegramAuthGuard(options);
  const CatalogController = makeCatalogController(catalogStore, TelegramAuthGuard);
  class RuntimeLifecycle implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): void { bot.onModuleInit(); }
    onModuleDestroy(): void { bot.onModuleDestroy(); }
  }
  class ApiModule {}
  Module({ controllers: [HealthController, CatalogController], providers: [RuntimeLifecycle] })(ApiModule);
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
    logger: options.logger ?? ["error", "warn", "log"],
  });
  app.use((_request: unknown, response: { setHeader(name: string, value: string): void }, next: () => void) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
  });
  if (options.staticRoot) {
    const staticRoot = options.staticRoot;
    app.useStaticAssets(staticRoot, { index: ["index.html"] });
    app.use((
      request: { method: string; path: string },
      response: { sendFile(filePath: string): void },
      next: () => void,
    ) => {
      const isApi = request.path === "/api" || request.path.startsWith("/api/");
      const isHealth = request.path === "/health" || request.path.startsWith("/health/");
      const isAsset = request.path === "/assets" || request.path.startsWith("/assets/");
      if (request.method === "GET" && !isApi && !isHealth && !isAsset) {
        response.sendFile(path.join(staticRoot, "index.html"));
        return;
      }
      next();
    });
  }
  app.enableShutdownHooks();
  return app;
}
