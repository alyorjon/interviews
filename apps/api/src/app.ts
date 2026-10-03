import "reflect-metadata";

import { randomBytes } from "node:crypto";
import path from "node:path";

import { type INestApplication, Logger, Module, type OnApplicationShutdown } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import compression from "compression";
import type { NextFunction, Request, Response } from "express";

import { API_CONFIG, type ApiConfig, type ApiOptions, resolveConfig } from "./config.js";
import { HealthController } from "./health.controller.js";
import { ProgressController } from "./progress.controller.js";
import { MemoryProgressStore, PROGRESS_STORE, type ProgressStore, RedisProgressStore } from "./progress.store.js";
import { TelegramAuthGuard } from "./telegram-auth.guard.js";
import { TelegramBotService } from "./telegram-bot.service.js";
import { TelegramWebhookController } from "./telegram-webhook.controller.js";

const IMMUTABLE = "public, max-age=31536000, immutable";
/** The manifest is tiny and must pick up new deploys quickly; CDNs may serve it stale while refreshing. */
const MANIFEST = "public, max-age=60, stale-while-revalidate=600";

/**
 * A fresh nonce per response lets Cloudflare mark the scripts it injects (bot
 * JavaScript detections, Web Analytics) as allowed without 'unsafe-inline':
 * it copies the nonce from this header. Our own HTML has no inline scripts.
 * https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/
 */
function contentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://telegram.org https://static.cloudflareinsights.com`,
    // React writes progress-bar widths as style attributes.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self' https://cloudflareinsights.com",
    "base-uri 'none'",
    "form-action 'none'",
    // Telegram Web/Desktop embed Mini Apps in an iframe.
    "frame-ancestors 'self' https://web.telegram.org https://*.telegram.org",
  ].join("; ");
}

function isReservedPath(requestPath: string): boolean {
  return ["/api", "/health", "/assets", "/data"].some((prefix) => requestPath === prefix || requestPath.startsWith(`${prefix}/`));
}

function cacheControlFor(filePath: string, staticRoot: string): string {
  const relative = path.relative(staticRoot, filePath).split(path.sep).join("/");
  if (relative === "data/manifest.json") return MANIFEST;
  if (relative.startsWith("assets/") || /^data\/(?:pages|topics)\//.test(relative)) return IMMUTABLE;
  return "no-cache";
}

function createProgressStore(config: ApiConfig, logger: Logger): ProgressStore {
  if (config.redisUrl) return new RedisProgressStore(config.redisUrl);
  if (config.production) {
    logger.warn("REDIS_URL is not set: progress lives in process memory and is NOT shared between replicas");
  }
  return new MemoryProgressStore();
}

export async function createApplication(options: ApiOptions = {}): Promise<INestApplication> {
  const config = resolveConfig(options);
  const logger = new Logger("Bootstrap");
  const bot = new TelegramBotService(options, config);
  const store = options.progressStore ?? createProgressStore(config, logger);

  class Lifecycle implements OnApplicationShutdown {
    onModuleInit(): void { bot.onModuleInit(); }
    async onApplicationShutdown(): Promise<void> {
      bot.onModuleDestroy();
      await store.close();
    }
  }

  @Module({
    controllers: [HealthController, ProgressController, TelegramWebhookController],
    providers: [
      { provide: API_CONFIG, useValue: config },
      { provide: PROGRESS_STORE, useValue: store },
      { provide: TelegramBotService, useValue: bot },
      TelegramAuthGuard,
      Lifecycle,
    ],
  })
  class ApiModule {}

  const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
    logger: options.logger ?? ["error", "warn", "log"],
  });
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(compression({ threshold: 1024 }));
  app.use((_request: Request, response: Response, next: NextFunction) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    response.setHeader("Content-Security-Policy", contentSecurityPolicy(randomBytes(16).toString("base64")));
    next();
  });
  app.use("/api", (_request: Request, response: Response, next: NextFunction) => {
    response.setHeader("Cache-Control", "no-store");
    next();
  });

  if (options.staticRoot) {
    const staticRoot = options.staticRoot;
    app.useStaticAssets(staticRoot, {
      index: false,
      setHeaders: (response, filePath) => response.setHeader("Cache-Control", cacheControlFor(filePath, staticRoot)),
    });
    app.use((request: Request, response: Response, next: NextFunction) => {
      if ((request.method === "GET" || request.method === "HEAD") && !isReservedPath(request.path)) {
        response.setHeader("Cache-Control", "no-cache");
        response.sendFile(path.join(staticRoot, "index.html"));
        return;
      }
      next();
    });
  }
  app.enableShutdownHooks();
  return app;
}
