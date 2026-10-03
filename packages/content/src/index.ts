import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Catalog, CatalogCard, Difficulty, QualityScore } from "./types.js";

export * from "./types.js";

const EXCLUDED_DIRECTORIES = new Set([
  ".git", ".autopilot", ".claude", ".vscode", "node_modules", "graphify-out",
  "packages", "apps", "content-audit", "scripts", "dist", "coverage"
]);
const EXCLUDED_ROOT_DIRECTORIES = new Set(["docs"]);
const EXCLUDED_ROOT_FILES = new Set(["README.md", "AGENTS.md", "CLAUDE.md", "telegram_kanal_tahlili.md"]);

async function discoverMarkdown(root: string, current = root): Promise<string[]> {
  const entries = await readdir(current, { withFileTypes: true });
  const found: string[] = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".") || EXCLUDED_DIRECTORIES.has(entry.name)
      || current === root && EXCLUDED_ROOT_DIRECTORIES.has(entry.name)) continue;
    const absolute = path.join(current, entry.name);
    if (entry.isDirectory()) found.push(...await discoverMarkdown(root, absolute));
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      if (!relative.includes("/") && EXCLUDED_ROOT_FILES.has(relative)) continue;
      found.push(relative);
    }
  }
  return found.sort((a, b) => a.localeCompare(b));
}

function titleOf(markdown: string, sourcePath: string): string {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(sourcePath, path.extname(sourcePath));
}

function slugOf(sourcePath: string): string {
  return sourcePath.replace(/\.md$/i, "").normalize("NFKD").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function emptyScore() {
  return { score: 1, label: "boshlang'ich" as const, reasons: ["Savol-javob tuzilmasi hali aniqlanmadi"] };
}

interface RawCard {
  question: string;
  answer: string;
  context: string;
  options: string[];
  correctOption?: string;
  line: number;
}

function cleanInline(value: string): string {
  return value.replace(/^#+\s*/, "").replace(/^\*\*|\*\*$/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1").trim();
}

function answerKeys(markdown: string): Map<number, string> {
  const keys = new Map<number, string>();
  const section = markdown.match(/^#{1,6}\s+.*(?:Javoblar|Answer Key)[^\n]*\n([\s\S]*)$/im)?.[1] ?? "";
  for (const row of section.matchAll(/^\|(.+)\|\s*$/gm)) {
    const cells = row[1]!.split("|").map((cell) => cell.trim());
    for (let index = 0; index < cells.length - 1; index += 2) {
      if (/^\d+$/.test(cells[index] ?? "") && /^[A-D]$/i.test(cells[index + 1] ?? "")) {
        keys.set(Number(cells[index]), cells[index + 1]!.toUpperCase());
      }
    }
  }
  return keys;
}

const GENERIC_CONTEXT_TOKENS = new Set([
  "advanced", "answer", "answers", "asos", "asoslar", "basic", "basics", "beginner",
  "asosiy", "core", "daraja", "darajalar", "expert", "fundamental", "fundamentals", "ilgor", "intermediate",
  "interview", "interviews", "junior", "middle", "nazariya", "practice", "question", "questions",
  "murakkab", "orta", "savol", "savollar", "senior", "theory",
]);
const SEMANTIC_STOP_TOKENS = new Set([
  "about", "and", "an", "bilan", "bir", "bo", "bu", "for", "haqida", "how", "is", "nima",
  "of", "on", "or", "qanday", "the", "to", "uchun", "va", "what", "with", "why", "yicha", "yoki",
]);

function semanticTokens(value: string): Set<string> {
  return new Set(value.normalize("NFKC").toLocaleLowerCase("uz")
    .replace(/[‘’ʻʼ'`´]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/)
    .filter((token) => token.length > 1 && !SEMANTIC_STOP_TOKENS.has(token))
    .map((token) => token.length > 4 && token.endsWith("s") ? token.slice(0, -1) : token));
}

function isExplicitTaxonomyHeading(value: string): boolean {
  const normalized = cleanInline(value).normalize("NFKC").trim();
  return /^(?:\p{Extended_Pictographic}\uFE0F?\s*)*\d+[.)]\s+/u.test(normalized)
    || /^\d+\s*[–—-]\s*(?:qism|part)\b/iu.test(normalized)
    || /\(\s*Q?\d+\s*[–—-]\s*Q?\d+\s*\)/iu.test(normalized);
}

function relevantContext(lineage: string[], question: string): string {
  // Only the question is relevance evidence. Its raw answer span may contain a
  // following sibling section before the next question and must not legitimize it.
  const evidence = semanticTokens(question);
  for (let index = lineage.length - 1; index >= 0; index--) {
    const candidate = lineage[index]!;
    const tokens = [...semanticTokens(candidate)];
    if (tokens.some((token) => evidence.has(token))) return candidate;
    if (tokens.length > 0 && tokens.every((token) => GENERIC_CONTEXT_TOKENS.has(token) || /^q?\d+$/.test(token))) {
      return candidate;
    }
    if (isExplicitTaxonomyHeading(candidate)) return candidate;
  }
  // A document title is safe grounding even when it is broad. A nested heading
  // without lexical or taxonomy evidence is skipped as a likely unrelated sibling.
  return lineage[0] ?? "";
}

function looksLikeQuestionHeading(value: string): boolean {
  const normalized = cleanInline(value).normalize("NFKC").toLocaleLowerCase("uz");
  return /[?？]\s*$/.test(normalized)
    || /^(?:what|how|why|when|where|who|which|can|could|should|does|do|is|are|nima|qanday|nega|qayerda|qaysi|kim)\b/u.test(normalized);
}

function parseMarkdown(markdown: string): RawCard[] {
  const lines = markdown.split(/\r?\n/);
  const keys = answerKeys(markdown);
  const starts: Array<{ index: number; line: number; kind: "heading" | "label" | "quiz"; question: string; lineage: string[]; number?: number }> = [];
  const headingStack: Array<{ level: number; text: string; isQuestion: boolean }> = [];
  let fence: { marker: "`" | "~"; length: number } | undefined;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]!;
    const fenceRun = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      // Accept the CommonMark closing form and the corpus's legacy ` ```# heading`
      // typo. The latter still closes the fence, but its attached text is not
      // promoted to structural lineage.
      const closing = fenceRun?.[1];
      if (closing?.[0] === fence.marker && closing.length >= fence.length) fence = undefined;
      continue;
    }
    if (fenceRun) {
      const run = fenceRun[1]!;
      fence = { marker: run[0] as "`" | "~", length: run.length };
      continue;
    }
    // Only a heading that *starts* an answer-key section is skipped; "oqimli javoblar"
    // inside a real question heading must still become a card.
    if (/^#{1,6}\s+(?:✅\s*)?(?:Javoblar|Answer Key)\b/i.test(line)) continue;
    const markdownHeading = line.match(/^(#{1,6})\s+(.+)$/);
    const headingLevel = markdownHeading?.[1].length;
    if (headingLevel !== undefined) {
      while (headingStack.at(-1)?.level !== undefined && headingStack.at(-1)!.level >= headingLevel) headingStack.pop();
    }
    const lineage = headingStack.filter((heading) => !heading.isQuestion).map((heading) => heading.text);
    const heading = line.match(/^#{2,6}\s+(?:(?:Q|Savol|Question)\s*\d*[.):-]?\s*|\d+[.)]\s*)(.+)$/i);
    if (heading && (/[?？]$/.test(heading[1]!.trim()) || /^(?:Q|Savol|Question)/i.test(line.replace(/^#+\s*/, "")))) {
      starts.push({ index, line: index + 1, kind: "heading", question: cleanInline(heading[1]!), lineage });
      headingStack.push({ level: headingLevel!, text: cleanInline(markdownHeading![2]!), isQuestion: true });
      continue;
    }
    const questionHeading = line.match(/^#{2,6}\s+(\d+[.)]\s+.+[?？])\s*$/);
    if (questionHeading) {
      starts.push({ index, line: index + 1, kind: "heading", question: cleanInline(questionHeading[1]!.replace(/^\d+[.)]\s*/, "")), lineage });
      headingStack.push({ level: headingLevel!, text: cleanInline(markdownHeading![2]!), isQuestion: true });
      continue;
    }
    const plainQuestionHeading = line.match(/^#{2,6}\s+(.+[?？])\s*$/);
    if (plainQuestionHeading) {
      starts.push({ index, line: index + 1, kind: "heading", question: cleanInline(plainQuestionHeading[1]!), lineage });
      headingStack.push({ level: headingLevel!, text: cleanInline(markdownHeading![2]!), isQuestion: true });
      continue;
    }
    // "## 10. String formatlash / String formatting": numbered bilingual topic
    // headings are questions; "## 1. Basics / Asoslar (1–25)" ranges are sections.
    const bilingualHeading = line.match(/^#{2,6}\s+\d+[.)]\s+(.+\s\/\s.+)$/);
    if (bilingualHeading && !/\(\s*Q?\d+\s*[–—-]\s*Q?\d+\s*\)/.test(line)) {
      starts.push({ index, line: index + 1, kind: "heading", question: cleanInline(bilingualHeading[1]!), lineage });
      headingStack.push({ level: headingLevel!, text: cleanInline(markdownHeading![2]!), isQuestion: true });
      continue;
    }
    if (markdownHeading) {
      headingStack.push({
        level: headingLevel!,
        text: cleanInline(markdownHeading[2]!),
        isQuestion: looksLikeQuestionHeading(markdownHeading[2]!),
      });
      continue;
    }
    const label = line.match(/^\s*(?:\*\*)?(?:Savol|Question)(?:\s*\d+)?\s*:\s*(.+?)(?:\*\*)?\s*$/i);
    if (label) {
      starts.push({ index, line: index + 1, kind: "label", question: cleanInline(label[1]!), lineage });
      continue;
    }
    // "**22. SAVEPOINT nima?**" — a whole bold, numbered line is a question with a prose answer.
    const boldNumbered = line.match(/^\s*\*\*\d+[.)]\s+(.+?)\*\*\s*$/);
    if (boldNumbered) {
      starts.push({ index, line: index + 1, kind: "label", question: cleanInline(boldNumbered[1]!), lineage });
      continue;
    }
    const quiz = line.match(/^\s*\*\*(\d+)[.)]\*\*\s*(.+)$/);
    if (quiz) starts.push({ index, line: index + 1, kind: "quiz", number: Number(quiz[1]), question: cleanInline(quiz[2]!), lineage });
  }

  // A question-like heading whose body is empty before the next question is a
  // section title ("## 1. Asoslar / Basics", "### SAP B1 nima?"), not a card.
  const isSectionTitle = (position: number) => {
    const start = starts[position]!;
    const next = starts[position + 1];
    return start.kind === "heading" && next !== undefined
      && lines.slice(start.index + 1, next.index).every((line) => /^\s*(?:-{3,}|\*{3,}|#{1,6}\s.*)?\s*$/.test(line));
  };
  return starts.flatMap((start, position) => {
    if (isSectionTitle(position)) return [];
    const end = starts[position + 1]?.index ?? lines.length;
    const body = lines.slice(start.index + 1, end);
    const answerSection = body.findIndex((line) => /^\s*(?:\*\*)?(?:Javob|Answer)\s*:/i.test(line));
    const options = body.filter((line) => /^\s*[A-D][.)]\s+/.test(line)).map((line) => cleanInline(line));
    const correctOption = start.number === undefined ? undefined : keys.get(start.number);
    let answer = answerSection >= 0
      ? body.slice(answerSection).join("\n").replace(/^\s*(?:\*\*)?(?:Javob|Answer)\s*:\s*(?:\*\*)?/i, "").trim()
      : body.join("\n").trim();
    if (start.kind === "quiz") {
      answer = options.find((option) => option.toUpperCase().startsWith(`${correctOption})`))?.replace(/^[A-D][.)]\s+/, "") ?? "";
    }
    const context = relevantContext(start.lineage, start.question);
    return [{ question: start.question, answer, context, options, correctOption, line: start.line }];
  });
}

function labelFor(score: number): QualityScore["label"] {
  if (score >= 9) return "kuchli";
  if (score >= 7) return "yetuk";
  if (score >= 4) return "rivojlanmoqda";
  return "boshlang'ich";
}

function cardScore(raw: RawCard): QualityScore {
  const reasons: string[] = [];
  let score = 2;
  if (raw.question.length >= 24) { score += 2; reasons.push("savol konteksti aniq"); }
  if (raw.answer.length >= 40) { score += 2; reasons.push("javob izohga ega"); }
  if (/```|`[^`]+`/.test(raw.answer)) { score += 2; reasons.push("amaliy kod yoki buyruq bor"); }
  if (/\b(?:misol|example|masalan|for example)\b/i.test(raw.answer)) { score += 1; reasons.push("misol bilan mustahkamlangan"); }
  if (/\s\/\s/.test(raw.question) || /\b(?:EN|UZB):/i.test(raw.answer)) { score += 1; reasons.push("ikki tilli signal bor"); }
  score = Math.min(10, score);
  if (!raw.answer.trim()) reasons.push("manbada alohida javob topilmadi");
  if (!reasons.length) reasons.push("savol yoki javobni boyitish kerak");
  return { score, label: labelFor(score), reasons };
}

function difficultyOf(text: string): Difficulty {
  if (/expert|ekspert/i.test(text)) return "expert";
  if (/advanced|yuqori|ilg'or/i.test(text)) return "advanced";
  if (/intermediate|o'rta/i.test(text)) return "intermediate";
  if (/basic|beginner|boshlang/i.test(text)) return "beginner";
  return "unspecified";
}

function makeCard(raw: RawCard, pageTitle: string, sourcePath: string): CatalogCard {
  const fingerprint = fingerprintQuestion(raw.question);
  const answer = raw.answer.trim();
  const answerFragments = answer.split(/(?<=[.!?;])\s+|\n+/u)
    .map((fragment) => fragment.trim()).filter((fragment) => /[\p{L}\p{N}]/u.test(fragment));
  const answerSummary = answerFragments[0] ?? "";
  const detailFragments = answerFragments.slice(1);
  const answerDetail = detailFragments.join("\n");
  const questionContext = raw.context && raw.context !== raw.question ? raw.context : pageTitle !== raw.question ? pageTitle : "";
  const groundingFragments: CatalogCard["enrichment"]["groundingFragments"] = [
    ...(questionContext ? [{ field: "questionContext" as const, text: questionContext }] : []),
    ...(answerSummary ? [{ field: "answerSummary" as const, text: answerSummary }] : []),
    ...detailFragments.map((text) => ({ field: "answerDetail" as const, text }))
  ];
  const sourceGrounded = Boolean(answerSummary)
    && groundingFragments.every((fragment) => `${pageTitle}\n${raw.context}\n${raw.question}\n${answer}`.includes(fragment.text));
  const needsSource = !answerSummary;
  const additionalSource = "Qo'shimcha manba kerak";
  const followUp = answerFragments.find((fragment, index) => index > 0 && /[?？]$/.test(fragment)) ?? additionalSource;
  const commonMistake = answerFragments.find((fragment) => /\b(?:xato|mistake|avoid|ehtiyot|noto'g'ri)\b/i.test(fragment)) ?? additionalSource;
  return {
    id: `card-${fingerprint}`,
    fingerprint,
    question: raw.question,
    answer,
    expandedQuestion: questionContext ? `${questionContext}\n\n${raw.question}` : raw.question,
    expandedAnswer: answerSummary ? (answerDetail ? `${answerSummary}\n\n${answerDetail}` : answerSummary) : additionalSource,
    enrichment: { questionContext, answerSummary: sourceGrounded ? answerSummary : "", answerDetail: sourceGrounded ? answerDetail : "", groundingFragments: sourceGrounded ? groundingFragments : [] },
    sourceGrounded,
    needsSource,
    options: raw.options,
    ...(raw.correctOption ? { correctOption: raw.correctOption } : {}),
    quality: cardScore(raw),
    metadata: {
      difficulty: difficultyOf(`${raw.question}\n${raw.answer}`),
      tags: [...new Set(sourcePath.replace(/\.md$/i, "").split(/[\/_-]+/).filter((tag) => tag.length > 2))].slice(0, 5),
      keyPoint: sourceGrounded ? answerSummary : additionalSource,
      followUp,
      commonMistake
    },
    sources: [{ sourcePath, question: raw.question, line: raw.line }]
  };
}

/**
 * Merges cards that share `keyOf(card)` into the first one seen. The survivor
 * keeps its id (stored user progress refers to it); `aliases` records every
 * absorbed id so page card lists can be remapped.
 */
function canonicalize(cards: CatalogCard[], keyOf: (card: CatalogCard) => string, aliases: Map<string, string>): CatalogCard[] {
  const byKey = new Map<string, CatalogCard>();
  for (const card of cards) {
    const key = keyOf(card) || card.id;
    const existing = byKey.get(key);
    if (!existing) { byKey.set(key, card); continue; }
    if (existing.id !== card.id) aliases.set(card.id, existing.id);
    existing.sources.push(...card.sources);
    if (card.answer.length > existing.answer.length) {
      existing.answer = card.answer;
      existing.expandedQuestion = card.expandedQuestion;
      existing.expandedAnswer = card.expandedAnswer;
      existing.enrichment = card.enrichment;
      existing.sourceGrounded = card.sourceGrounded;
      existing.quality = card.quality;
      existing.needsSource = card.needsSource;
      existing.metadata = card.metadata;
    }
    if (card.options.length > existing.options.length) existing.options = card.options;
    if (!existing.correctOption && card.correctOption) existing.correctOption = card.correctOption;
  }
  return [...byKey.values()];
}

/** Order- and language-insensitive key: "What is Docker? | Docker nima?" equals "Docker nima? / What is Docker?". */
function equivalenceKey(card: CatalogCard): string {
  return [...normalizedTokens(card.question)].sort().join(" ");
}

function normalizedTokens(question: string): Set<string> {
  const questionWords = new Set(["nima", "degani", "qanday", "what", "does", "mean", "is", "the", "a", "an"]);
  return new Set(question.normalize("NFKC").toLocaleLowerCase("uz").replace(/[‘’ʻʼ`´]/g, "'")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/)
    .filter((token) => token.length > 1 && !questionWords.has(token)));
}

function tokenSimilarity(left: string, right: string): number {
  const a = normalizedTokens(left);
  const b = normalizedTokens(right);
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const token of a) if (b.has(token)) shared++;
  return shared / new Set([...a, ...b]).size;
}

function scorePage(markdown: string, cardScores: QualityScore[], kind: "content" | "design"): QualityScore {
  const reasons: string[] = [];
  let score = 2;
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 250) { score += 2; reasons.push("o'qish uchun yetarli hajm bor"); }
  if (cardScores.length) { score += 2; reasons.push(`${cardScores.length} ta savol kartasi ajratildi`); }
  if (/```[\s\S]*?```/.test(markdown)) { score += 1; reasons.push("kod yoki amaliy blok bor"); }
  if (/^\|.+\|$/m.test(markdown)) { score += 1; reasons.push("tuzilgan jadval bor"); }
  if (/^#{2,4}\s+/m.test(markdown)) { score += 1; reasons.push("sarlavha iyerarxiyasi bor"); }
  if (kind === "design" && (/\n.{180,}\n/.test(markdown) || /<[^>]+>/.test(markdown))) {
    score -= 1; reasons.push("mobil o'qish uchun uzun yoki HTML blok audit talab qiladi");
  }
  if (kind === "content" && cardScores.length) {
    const average = cardScores.reduce((sum, item) => sum + item.score, 0) / cardScores.length;
    if (average >= 7) { score += 1; reasons.push("kartalar o'rtacha yetuk darajada"); }
  }
  if (!reasons.length) reasons.push("sahifa tuzilmasini boyitish kerak");
  score = Math.max(1, Math.min(10, score));
  return { score, label: labelFor(score), reasons };
}

export async function buildCatalog(root: string): Promise<Catalog> {
  const sources = await discoverMarkdown(path.resolve(root));
  const extracted: CatalogCard[] = [];
  const pages = [];
  for (const sourcePath of sources) {
    const markdown = await readFile(path.join(root, sourcePath), "utf8");
    const title = titleOf(markdown, sourcePath);
    const pageCards = parseMarkdown(markdown).map((raw) => makeCard(raw, title, sourcePath));
    extracted.push(...pageCards);
    const contentScore = scorePage(markdown, pageCards.map((card) => card.quality), "content");
    const designReadinessScore = scorePage(markdown, pageCards.map((card) => card.quality), "design");
    const overallValue = Math.round((contentScore.score + designReadinessScore.score) / 2);
    pages.push({
      slug: slugOf(sourcePath), title, sourcePath, markdown,
      cardIds: [...new Set(pageCards.map((card) => card.id))], contentScore, designReadinessScore,
      overallScore: { score: overallValue, label: labelFor(overallValue), reasons: ["kontent va dizayn tayyorligi o'rtachasi"] }
    });
  }
  const aliases = new Map<string, string>();
  const cards = canonicalize(canonicalize(extracted, (card) => card.fingerprint, aliases), equivalenceKey, aliases);
  for (const page of pages) page.cardIds = [...new Set(page.cardIds.map((id) => aliases.get(id) ?? id))];
  const nearDuplicates = [];
  for (let left = 0; left < cards.length; left++) {
    for (let right = left + 1; right < cards.length; right++) {
      const similarity = tokenSimilarity(cards[left]!.question, cards[right]!.question);
      if (similarity >= 0.82) {
        nearDuplicates.push({ leftCardId: cards[left]!.id, rightCardId: cards[right]!.id, similarity: Number(similarity.toFixed(3)) });
      }
    }
  }
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    pages,
    cards,
    nearDuplicates,
    summary: {
      pageCount: pages.length, extractedQuestionCount: extracted.length, canonicalQuestionCount: cards.length,
      duplicateCount: extracted.length - cards.length, nearDuplicateCount: nearDuplicates.length,
      questionsNeedingSource: cards.filter((card) => card.needsSource).length
    }
  };
}

export function fingerprintQuestion(question: string): string {
  const normalized = question.normalize("NFKC").toLocaleLowerCase("uz")
    .replace(/[‘’ʻʼ`´]/g, "'").replace(/[`*_#>]/g, "")
    .replace(/^(?:q|savol|question)\s*\d+[.):-]\s*/i, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/g, " ");
  return createHash("sha256").update(normalized).digest("hex").slice(0, 20);
}

export async function writeContentAudit(root: string, outputDirectory = path.join(root, "content-audit")): Promise<Catalog> {
  const catalog = await buildCatalog(root);
  const summary = {
    generatedAt: catalog.generatedAt,
    pageCount: catalog.summary.pageCount,
    questionCount: catalog.summary.extractedQuestionCount,
    deduplicatedQuestionCount: catalog.summary.canonicalQuestionCount,
    duplicateCount: catalog.summary.duplicateCount,
    nearDuplicateCount: catalog.summary.nearDuplicateCount,
    questionsNeedingSource: catalog.summary.questionsNeedingSource,
    pages: catalog.pages.map((page) => ({
      sourcePath: page.sourcePath,
      slug: page.slug,
      extractedQuestionCount: catalog.cards.reduce(
        (count, card) => count + card.sources.filter((source) => source.sourcePath === page.sourcePath).length,
        0
      ),
      canonicalQuestionCount: page.cardIds.length,
      contentScore: page.contentScore,
      designReadinessScore: page.designReadinessScore,
      overallScore: page.overallScore
    }))
  };
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(path.join(outputDirectory, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8"),
    writeFile(path.join(outputDirectory, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8")
  ]);
  return catalog;
}

export { topicId, topicLabel } from "./topics.js";
export { writeStaticBundle } from "./static-bundle.js";
