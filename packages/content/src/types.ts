export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert" | "unspecified";

export interface QualityScore {
  score: number;
  label: "boshlang'ich" | "rivojlanmoqda" | "yetuk" | "kuchli";
  reasons: string[];
}

export interface SourceAlias {
  sourcePath: string;
  question: string;
  line: number;
}

export interface CardMetadata {
  difficulty: Difficulty;
  tags: string[];
  keyPoint: string;
  followUp: string;
  commonMistake: string;
}

export interface CatalogCard {
  id: string;
  fingerprint: string;
  question: string;
  answer: string;
  expandedQuestion: string;
  expandedAnswer: string;
  enrichment: {
    questionContext: string;
    answerSummary: string;
    answerDetail: string;
    groundingFragments: Array<{
      field: "questionContext" | "answerSummary" | "answerDetail";
      text: string;
    }>;
  };
  sourceGrounded: boolean;
  needsSource: boolean;
  options: string[];
  correctOption?: string;
  quality: QualityScore;
  metadata: CardMetadata;
  sources: SourceAlias[];
}

export interface CatalogPage {
  slug: string;
  title: string;
  sourcePath: string;
  markdown: string;
  cardIds: string[];
  contentScore: QualityScore;
  designReadinessScore: QualityScore;
  overallScore: QualityScore;
}

export interface AuditSummary {
  pageCount: number;
  extractedQuestionCount: number;
  canonicalQuestionCount: number;
  duplicateCount: number;
  nearDuplicateCount: number;
  questionsNeedingSource: number;
}

export interface NearDuplicate {
  leftCardId: string;
  rightCardId: string;
  similarity: number;
}

export interface Catalog {
  schemaVersion: 1;
  generatedAt: string;
  pages: CatalogPage[];
  cards: CatalogCard[];
  nearDuplicates: NearDuplicate[];
  summary: AuditSummary;
}

/*
 * Static, CDN-cacheable bundle consumed by the web client. Only fields the UI
 * renders are kept, so each shard stays small and identical for every user.
 */
export interface StudyCardData {
  id: string;
  question: string;
  /** Raw Markdown answer from the source; empty when the source has none. */
  answer: string;
  difficulty: Difficulty;
  topic: string;
  page: string;
  options?: string[];
  correctOption?: string;
}

export interface ManifestPage {
  slug: string;
  title: string;
  sourcePath: string;
  cardCount: number;
  /** Relative URL of the page shard, content-hashed and immutable. */
  file: string;
}

export interface ManifestTopic {
  id: string;
  label: string;
  cardCount: number;
  /** Relative URL of the topic's review shard, content-hashed and immutable. */
  file: string;
  pages: ManifestPage[];
}

export interface StaticManifest {
  schemaVersion: 2;
  version: string;
  generatedAt: string;
  pageCount: number;
  cardCount: number;
  topics: ManifestTopic[];
}

export interface StaticPage {
  slug: string;
  title: string;
  sourcePath: string;
  topic: string;
  markdown: string;
  cards: StudyCardData[];
}

export interface StaticTopic {
  id: string;
  label: string;
  cards: StudyCardData[];
}
