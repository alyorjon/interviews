import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { topicId, topicLabel } from "./topics.js";
import type {
  Catalog, CatalogCard, ManifestTopic, StaticManifest, StaticPage, StaticTopic, StudyCardData,
} from "./types.js";

function contentHash(body: string): string {
  return createHash("sha256").update(body).digest("hex").slice(0, 12);
}

function toStudyCard(card: CatalogCard, page: string, topic: string): StudyCardData {
  return {
    id: card.id,
    question: card.question,
    answer: card.answer,
    difficulty: card.metadata.difficulty,
    topic,
    page,
    ...(card.options.length ? { options: card.options } : {}),
    ...(card.correctOption ? { correctOption: card.correctOption } : {}),
  };
}

/**
 * Writes the catalog as immutable, content-hashed JSON shards plus a small
 * `manifest.json` entry point. Everything here is the same for every user, so
 * a CDN can serve it without touching the Node process.
 */
export async function writeStaticBundle(catalog: Catalog, outputDirectory: string): Promise<StaticManifest> {
  const cardsById = new Map(catalog.cards.map((card) => [card.id, card]));
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(path.join(outputDirectory, "pages"), { recursive: true });
  await mkdir(path.join(outputDirectory, "topics"), { recursive: true });

  const writeShard = async (folder: string, name: string, data: unknown): Promise<string> => {
    const body = JSON.stringify(data);
    const file = `${folder}/${name}.${contentHash(body)}.json`;
    await writeFile(path.join(outputDirectory, file), body, "utf8");
    return file;
  };

  type TopicDraft = ManifestTopic & { cards: Map<string, StudyCardData> };
  const topics = new Map<string, TopicDraft>();
  for (const page of catalog.pages) {
    const id = topicId(page.sourcePath);
    const cards = page.cardIds
      .map((cardId) => cardsById.get(cardId))
      .filter((card): card is CatalogCard => card !== undefined)
      .map((card) => toStudyCard(card, page.slug, id));
    const shard: StaticPage = {
      slug: page.slug, title: page.title, sourcePath: page.sourcePath, topic: id, markdown: page.markdown, cards,
    };
    const file = await writeShard("pages", page.slug, shard);
    const topic: TopicDraft = topics.get(id) ?? {
      id, label: topicLabel(page.sourcePath), cardCount: 0, file: "", pages: [], cards: new Map(),
    };
    topic.pages.push({ slug: page.slug, title: page.title, sourcePath: page.sourcePath, cardCount: cards.length, file });
    for (const card of cards) if (!topic.cards.has(card.id)) topic.cards.set(card.id, card);
    topics.set(id, topic);
  }

  const manifestTopics: ManifestTopic[] = [];
  for (const { cards, ...topic } of topics.values()) {
    const shard: StaticTopic = { id: topic.id, label: topic.label, cards: [...cards.values()] };
    const file = await writeShard("topics", topic.id, shard);
    manifestTopics.push({ ...topic, cardCount: cards.size, file });
  }
  manifestTopics.sort((left, right) => right.cardCount - left.cardCount || left.label.localeCompare(right.label));

  const manifest: StaticManifest = {
    schemaVersion: 2,
    version: contentHash(JSON.stringify(manifestTopics)),
    generatedAt: catalog.generatedAt,
    pageCount: catalog.pages.length,
    cardCount: catalog.cards.length,
    topics: manifestTopics,
  };
  await writeFile(path.join(outputDirectory, "manifest.json"), JSON.stringify(manifest), "utf8");
  return manifest;
}
