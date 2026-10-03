import {
  type CanActivate, createParamDecorator, type ExecutionContext, ForbiddenException, Inject, Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { API_CONFIG, type ApiConfig } from "./config.js";
import { InitDataError, type TelegramUser, verifyInitData } from "./telegram-init-data.js";

/** Stable user for local development with AUTH_BYPASS=true (never allowed in production). */
export const BYPASS_USER: TelegramUser = { id: 1 };

interface AuthenticatedRequest {
  headers: Record<string, string | string[] | undefined>;
  telegramUser?: TelegramUser;
}

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(@Inject(API_CONFIG) private readonly config: ApiConfig) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (this.config.authBypass) {
      request.telegramUser = BYPASS_USER;
      return true;
    }
    const initData = request.headers["x-telegram-init-data"];
    if (typeof initData !== "string" || !initData) throw new UnauthorizedException("Telegram Mini App orqali kiring");
    if (!this.config.botToken) throw new UnauthorizedException("Telegram kirish sozlanmagan");
    let user: TelegramUser;
    try {
      user = verifyInitData(initData, this.config.botToken, this.config.nowSeconds(), this.config.initDataMaxAgeSeconds);
    } catch (error) {
      if (error instanceof InitDataError) throw new UnauthorizedException(error.message);
      throw error;
    }
    if (this.config.allowedUserIds.size && !this.config.allowedUserIds.has(user.id)) {
      throw new ForbiddenException("Bu hisobga portalga kirish ruxsati berilmagan");
    }
    request.telegramUser = user;
    return true;
  }
}

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext): TelegramUser => {
  const user = context.switchToHttp().getRequest<AuthenticatedRequest>().telegramUser;
  if (!user) throw new UnauthorizedException("Telegram Mini App orqali kiring");
  return user;
});
