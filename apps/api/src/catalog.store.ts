import { readFile } from "node:fs/promises";

import { buildCatalog, type Catalog, type CatalogCard } from "@interviews/content";

import type { ApiOptions } from "./config.js";

export class CatalogStore {
  private catalogPromise?: Promise<Catalog>;
  private cardIndexPromise?: Promise<ReadonlyMap<string, CatalogCard>>;

  constructor(private readonly options: ApiOptions) {}

  getCatalog(): Promise<Catalog> {
    this.catalogPromise ??= this.options.catalogLoader?.()
      ?? (this.options.catalogPath ? this.loadCatalog(this.options.catalogPath) : undefined)
      ?? buildCatalog(this.options.contentRoot ?? process.env.CONTENT_ROOT ?? process.cwd());
    return this.catalogPromise;
  }

  private async loadCatalog(catalogPath: string): Promise<Catalog> {
    const catalog = JSON.parse(await readFile(catalogPath, "utf8")) as Catalog;
    if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.pages) || !Array.isArray(catalog.cards)) {
      throw new Error(`Invalid content catalog: ${catalogPath}`);
    }
    return catalog;
  }

  getCardIndex(): Promise<ReadonlyMap<string, CatalogCard>> {
    this.cardIndexPromise ??= this.getCatalog().then(
      (catalog) => new Map(catalog.cards.map((card) => [card.id, card])),
    );
    return this.cardIndexPromise;
  }
}
