import { BadRequestException, Controller, Get, NotFoundException, Param, Query, type CanActivate, type Type, UseGuards } from "@nestjs/common";
import type { AuditSummary, CatalogCard, CatalogPage, QualityScore } from "@interviews/content";

import { CatalogStore } from "./catalog.store.js";

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface CatalogPageSummary {
  slug: string;
  title: string;
  sourcePath: string;
  cardCount: number;
  contentScore: QualityScore;
  designReadinessScore: QualityScore;
  overallScore: QualityScore;
}

export interface CatalogResponse {
  schemaVersion: 1;
  generatedAt: string;
  summary: AuditSummary;
  items: CatalogPageSummary[];
  pagination: Pagination;
}

export interface PageResponse {
  page: CatalogPage;
  cards: CatalogCard[];
  pagination: Pagination;
}

function positiveInteger(raw: string | undefined, fallback: number, maximum?: number): number {
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (!/^\d+$/.test(raw) || !Number.isSafeInteger(value) || value < 1) {
    throw new BadRequestException("page va pageSize xavfsiz musbat butun son bo'lishi kerak");
  }
  return maximum === undefined ? value : Math.min(value, maximum);
}

function pagination(page: number, pageSize: number, totalItems: number): Pagination {
  return { page, pageSize, totalItems, totalPages: Math.ceil(totalItems / pageSize) };
}

export function makeCatalogController(store: CatalogStore, authGuard: Type<CanActivate>): Type<unknown> {
  class CatalogController {
    async catalog(pageRaw?: string, pageSizeRaw?: string): Promise<CatalogResponse> {
      const page = positiveInteger(pageRaw, 1);
      const pageSize = positiveInteger(pageSizeRaw, 20, 100);
      const catalog = await store.getCatalog();
      const start = (page - 1) * pageSize;
      const items = catalog.pages.slice(start, start + pageSize).map(({ markdown: _markdown, cardIds, ...item }) => ({
        ...item,
        cardCount: cardIds.length,
      }));
      return {
        schemaVersion: catalog.schemaVersion,
        generatedAt: catalog.generatedAt,
        summary: catalog.summary,
        items,
        pagination: pagination(page, pageSize, catalog.pages.length),
      };
    }

    async page(slug: string, pageRaw?: string, pageSizeRaw?: string): Promise<PageResponse> {
      const pageNumber = positiveInteger(pageRaw, 1);
      const pageSize = positiveInteger(pageSizeRaw, 20, 100);
      const catalog = await store.getCatalog();
      const selectedPage = catalog.pages.find((page) => page.slug === slug);
      if (!selectedPage) throw new NotFoundException(`Sahifa topilmadi: ${slug}`);
      const cardById = await store.getCardIndex();
      const start = (pageNumber - 1) * pageSize;
      const cards = selectedPage.cardIds.slice(start, start + pageSize)
        .map((cardId) => cardById.get(cardId))
        .filter((card): card is CatalogCard => card !== undefined);
      return {
        page: selectedPage,
        cards,
        pagination: pagination(pageNumber, pageSize, selectedPage.cardIds.length),
      };
    }
  }

  Controller("api")(CatalogController);
  UseGuards(authGuard)(CatalogController);
  Get("catalog")(CatalogController.prototype, "catalog", Object.getOwnPropertyDescriptor(CatalogController.prototype, "catalog")!);
  Query("page")(CatalogController.prototype, "catalog", 0);
  Query("pageSize")(CatalogController.prototype, "catalog", 1);
  Get("pages/:slug")(CatalogController.prototype, "page", Object.getOwnPropertyDescriptor(CatalogController.prototype, "page")!);
  Param("slug")(CatalogController.prototype, "page", 0);
  Query("page")(CatalogController.prototype, "page", 1);
  Query("pageSize")(CatalogController.prototype, "page", 2);
  return CatalogController;
}
