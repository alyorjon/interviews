import {
  BadRequestException, Body, Controller, Get, Inject, PayloadTooLargeException, Put, ServiceUnavailableException, UseGuards,
} from "@nestjs/common";

import {
  MAX_CARDS_PER_USER, PROGRESS_STORE, ProgressLimitError, type ProgressScores, type ProgressStore, StoreUnavailableError,
} from "./progress.store.js";
import { CurrentUser, TelegramAuthGuard } from "./telegram-auth.guard.js";
import type { TelegramUser } from "./telegram-init-data.js";

export interface ProgressResponse {
  scores: ProgressScores;
}

const CARD_ID = /^card-[a-f0-9]{20}$/;
/** Enough for a whole offline session to sync in one request. */
const MAX_SCORES_PER_REQUEST = 500;

function validScores(body: unknown): ProgressScores {
  const scores = (body as { scores?: unknown } | null)?.scores;
  if (!scores || typeof scores !== "object" || Array.isArray(scores)) {
    throw new BadRequestException("scores obyekt bo'lishi kerak");
  }
  const entries = Object.entries(scores);
  if (entries.length === 0 || entries.length > MAX_SCORES_PER_REQUEST) {
    throw new BadRequestException(`scores 1 dan ${MAX_SCORES_PER_REQUEST} tagacha yozuvdan iborat bo'lishi kerak`);
  }
  for (const [cardId, score] of entries) {
    if (!CARD_ID.test(cardId) || !Number.isInteger(score) || (score as number) < 1 || (score as number) > 10) {
      throw new BadRequestException("har bir baho card-id: 1..10 ko'rinishida bo'lishi kerak");
    }
  }
  return scores as ProgressScores;
}

function mapStoreError(error: unknown): never {
  if (error instanceof StoreUnavailableError) throw new ServiceUnavailableException("Progress saqlovchisi vaqtincha mavjud emas");
  if (error instanceof ProgressLimitError) throw new PayloadTooLargeException(`Bitta foydalanuvchi uchun ko'pi bilan ${MAX_CARDS_PER_USER} ta baho`);
  throw error;
}

@Controller("api/me/progress")
@UseGuards(TelegramAuthGuard)
export class ProgressController {
  constructor(@Inject(PROGRESS_STORE) private readonly store: ProgressStore) {}

  @Get()
  async get(@CurrentUser() user: TelegramUser): Promise<ProgressResponse> {
    return { scores: await this.store.get(user.id).catch(mapStoreError) };
  }

  @Put()
  async merge(@CurrentUser() user: TelegramUser, @Body() body: unknown): Promise<ProgressResponse> {
    return { scores: await this.store.merge(user.id, validScores(body)).catch(mapStoreError) };
  }
}
