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
