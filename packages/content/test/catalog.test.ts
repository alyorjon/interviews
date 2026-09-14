import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildCatalog, fingerprintQuestion, writeContentAudit } from "../src/index.js";

async function fixture(files: Record<string, string>): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "interviews-content-"));
  for (const [relative, body] of Object.entries(files)) {
    const target = path.join(root, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, body, "utf8");
  }
  return root;
}

test("buildCatalog discovers learning Markdown while excluding control files", async () => {
  const root = await fixture({
    "python/basics.md": "# Python\n\n## Q1. Generator nima?\n\nU qiymatlarni dangasa hisoblaydi.",
    "README.md": "# Control",
    ".autopilot/spec.md": "# Control",
    "docs/operations/runtime.md": "# Technical runbook",
    "python/docs/advanced.md": "# Advanced Python\n\n## Q1. Descriptor nima?\n\nDescriptor atributga kirishni boshqaradi.",
    "graphify-out/report.md": "# Control"
  });
  const catalog = await buildCatalog(root);
  assert.equal(catalog.summary.pageCount, 2);
  assert.deepEqual(catalog.pages.map((page) => page.sourcePath), ["python/basics.md", "python/docs/advanced.md"]);
});

test("extracts Q headings, Savol blocks, and numbered quizzes through Catalog", async () => {
  const root = await fixture({
    "heading.md": "# Heading\n\n## Q1. Closure nima?\n\nClosure tashqi scope qiymatini saqlaydi.\n\n## Q2. Event loop nima?\n\nEvent loop navbatlarni boshqaradi.",
    "savol.md": "# Practice\n\n**Savol:** Ikkinchi eng katta qiymat qanday topiladi?\n\n**Javob:** Tartiblab ikkinchi qiymat olinadi.",
    "quiz.md": "# Quiz\n\n**1.** Docker image nima?\nA) Jarayon\nB) O'zgarmas shablon\n\n## Javoblar\n| # | Javob |\n|---|---|\n| 1 | B |"
  });
  const catalog = await buildCatalog(root);
  assert.equal(catalog.summary.extractedQuestionCount, 4);
  assert.deepEqual(catalog.pages.map((page) => page.cardIds.length), [2, 1, 1]);
  const quiz = catalog.cards.find((card) => card.question.includes("Docker image"));
  assert.deepEqual(quiz?.options, ["A) Jarayon", "B) O'zgarmas shablon"]);
  assert.equal(quiz?.correctOption, "B");
  assert.match(quiz?.answer ?? "", /O'zgarmas shablon/);
});

test("merges exact normalized duplicates and preserves every source alias", async () => {
  const root = await fixture({
    "a.md": "# A\n\n## Q1. Event Loop nima?\n\nEvent loop vazifalar navbatini boshqaradi.",
    "nested/b.md": "# B\n\n**Savol:** event   loop nima ?\n\n**Javob:** Batafsilroq javob event loop navbatlarni boshqaradi. Microtask navbati macrotask navbatidan oldin bajariladi."
  });
  const catalog = await buildCatalog(root);
  assert.equal(catalog.summary.extractedQuestionCount, 2);
  assert.equal(catalog.summary.canonicalQuestionCount, 1);
  assert.equal(catalog.summary.duplicateCount, 1);
  assert.deepEqual(catalog.cards[0]?.sources.map((source) => source.sourcePath), ["a.md", "nested/b.md"]);
  assert.match(catalog.cards[0]?.answer ?? "", /Batafsilroq javob/);
  assert.equal(catalog.cards[0]?.sourceGrounded, true);
  assert.match(catalog.cards[0]?.enrichment.answerDetail ?? "", /Microtask/);
  assert.equal(catalog.pages[0]?.cardIds[0], catalog.pages[1]?.cardIds[0]);
});

test("scores pages and cards on 1-10 rubrics and keeps expansions source-grounded", async () => {
  const source = "# Async Python\n\n## Generator nima?\n\nGenerator qiymatlarni talab bo'yicha beradi. Masalan, katta oqimni birdan xotiraga olmaydi.\n\n```python\ndef stream():\n    yield 1\n```";
  const root = await fixture({ "python/generator.md": source });
  const catalog = await buildCatalog(root);
  const page = catalog.pages[0]!;
  const card = catalog.cards[0]!;
  for (const rubric of [page.contentScore, page.designReadinessScore, page.overallScore, card.quality]) {
    assert.ok(rubric.score >= 1 && rubric.score <= 10);
    assert.ok(rubric.reasons.length > 0);
  }
  assert.match(card.expandedQuestion, /Async Python/);
  assert.match(card.expandedAnswer, /talab bo'yicha/);
  assert.equal(card.sourceGrounded, true);
  assert.equal(card.needsSource, false);
  assert.equal(card.metadata.tags.includes("python"), true);
});

test("writes machine-readable catalog and audit summary with counts", async () => {
  const root = await fixture({ "topic.md": "# Topic\n\n## Q1. Cache nima?\n\nCache tez-tez o'qiladigan qiymatni saqlaydi." });
  const result = await writeContentAudit(root);
  const summary = JSON.parse(await (await import("node:fs/promises")).readFile(path.join(root, "content-audit/summary.json"), "utf8"));
  assert.equal(result.summary.pageCount, 1);
  assert.equal(summary.questionCount, 1);
  assert.equal(summary.deduplicatedQuestionCount, 1);
  assert.equal(summary.pages[0].sourcePath, "topic.md");
  assert.equal(summary.pages[0].extractedQuestionCount, 1);
  assert.equal(summary.pages[0].canonicalQuestionCount, 1);
  assert.equal("questionCount" in summary.pages[0], false);
});

test("reports likely duplicates for review without auto-merging them", async () => {
  const root = await fixture({
    "a.md": "# A\n\n## Q1. Docker image nima?\n\nImage o'zgarmas shablon.",
    "b.md": "# B\n\n## Q1. Docker image degani nima?\n\nU container uchun shablon bo'ladi."
  });
  const catalog = await buildCatalog(root);
  assert.equal(catalog.cards.length, 2);
  assert.equal(catalog.nearDuplicates.length, 1);
  assert.ok(catalog.nearDuplicates[0]!.similarity >= 0.82);
});

test("fingerprint keeps lexical Savol and Q words that change question meaning", () => {
  assert.notEqual(fingerprintQuestion("Savol berish nima?"), fingerprintQuestion("Berish nima?"));
  assert.notEqual(fingerprintQuestion("Q-learning nima?"), fingerprintQuestion("Learning nima?"));
});

test("every enrichment fragment is independently grounded in its source", async () => {
  const source = "# Python\n\n## Iteratorlar\n\n## Q1. Generator nima?\n\nGenerator qiymatlarni talab bo'yicha beradi. U katta oqimni birdan xotiraga olmaydi. Shu sabab katta datasetlarda xotira sarfi kamayadi.";
  const root = await fixture({ "python/generator.md": source });
  const card = (await buildCatalog(root)).cards[0]!;
  assert.notEqual(card.expandedQuestion, card.question);
  assert.equal(card.expandedQuestion, `${card.enrichment.questionContext}\n\n${card.question}`);
  assert.notEqual(card.enrichment.answerSummary, card.enrichment.answerDetail);
  assert.equal(card.enrichment.answerDetail.includes(card.enrichment.answerSummary), false);
  assert.equal(card.expandedAnswer, `${card.enrichment.answerSummary}\n\n${card.enrichment.answerDetail}`);
  assert.ok(source.includes(card.question));
  for (const fragment of card.enrichment.groundingFragments) {
    assert.ok(source.includes(fragment.text), `${fragment.field} fragment must occur in source`);
  }
  assert.equal(card.sourceGrounded, true);
});

test("empty answers are explicitly ungrounded and require an additional source", async () => {
  const root = await fixture({ "questions.md": "# Savollar\n\n## Q1. Javobsiz savol nima?" });
  const card = (await buildCatalog(root)).cards[0]!;
  assert.equal(card.sourceGrounded, false);
  assert.equal(card.needsSource, true);
  assert.match(card.expandedAnswer, /Qo'shimcha manba kerak/);
  assert.equal(card.enrichment.answerSummary, "");
  assert.equal(card.enrichment.answerDetail, "");
});

test("consecutive Q headings use the ancestor section, never a previous sibling question", async () => {
  const root = await fixture({
    "core.md": "# Core\n\n## Fundamentals\n\n### Q1. Define closure\n\nClosure stores lexical scope.\n\n### Q2. Define event loop\n\nEvent loop schedules queued work."
  });
  const catalog = await buildCatalog(root);
  assert.equal(catalog.cards.length, 2);
  assert.equal(catalog.cards[0]?.enrichment.questionContext, "Fundamentals");
  assert.equal(catalog.cards[1]?.enrichment.questionContext, "Fundamentals");
  assert.notEqual(catalog.cards[1]?.enrichment.questionContext, "Q1. Define closure");
});

test("question context excludes fenced sibling output and keeps only relevant structural lineage", async () => {
  const root = await fixture({
    "python/oop.md": "# OOP\n\n## Design Patterns\n\n```python\n# Toshkent Uzbekistan\n```\n\n### 94. What is the bridge pattern?\n\nBridge separates abstraction from implementation.\n\n## What is Geography\n\n```sql\n# ORDER BY salary DESC LIMIT 10 OFFSET 20\n```\n\n### 98. What is reflection in OOP?\n\nReflection inspects program structure at runtime."
  });
  const catalog = await buildCatalog(root);
  const bridge = catalog.cards.find((card) => card.question.includes("bridge pattern"));
  const reflection = catalog.cards.find((card) => card.question.includes("reflection"));
  assert.equal(bridge?.enrichment.questionContext, "Design Patterns");
  assert.equal(reflection?.enrichment.questionContext, "OOP");
  assert.doesNotMatch(catalog.cards.map((card) => card.expandedQuestion).join("\n"), /Toshkent Uzbekistan|ORDER BY salary/i);
});

test("declarative unrelated sibling sections do not become question context", async () => {
  const root = await fixture({
    "oop.md": "# OOP\n\n## Design Patterns\n\n### Q1. What is the bridge pattern?\n\nBridge separates abstraction from implementation.\n\n## Regional Geography\n\nA short unrelated declarative section.\n\n### Q2. What is reflection in OOP?\n\nReflection inspects program structure at runtime.\n\n## Regional / Geography\n\nAnother unrelated declarative section.\n\n### Q3. What is encapsulation in OOP?\n\nEncapsulation controls access to object state.\n\n## Regional | Geography\n\nOne more unrelated declarative section.\n\n### Q4. What is polymorphism in OOP?\n\nPolymorphism provides behavior through a shared interface."
  });
  const catalog = await buildCatalog(root);
  assert.equal(catalog.cards[0]?.enrichment.questionContext, "Design Patterns");
  assert.equal(catalog.cards[1]?.enrichment.questionContext, "OOP");
  assert.equal(catalog.cards[2]?.enrichment.questionContext, "OOP");
  assert.equal(catalog.cards[3]?.enrichment.questionContext, "OOP");
  assert.doesNotMatch(catalog.cards[1]?.expandedQuestion ?? "", /Regional Geography/);
  assert.doesNotMatch(catalog.cards.slice(2).map((card) => card.expandedQuestion).join("\n"), /Regional\s*[|/]\s*Geography/);
});

test("tilde fences with info strings and longer delimiters never create questions or lineage", async () => {
  const root = await fixture({
    "fences.md": "# Python\n\n## Real Examples\n\n~~~markdown\n## Q99. Fenced question must stay inert?\n\nFenced answer.\n### Fenced sibling heading\n~~~~\n\n### Q1. Real question?\n\nReal answer."
  });
  const catalog = await buildCatalog(root);
  assert.equal(catalog.cards.length, 1);
  assert.equal(catalog.cards[0]?.question, "Real question?");
  assert.equal(catalog.cards[0]?.enrichment.questionContext, "Real Examples");
  assert.doesNotMatch(catalog.cards[0]?.expandedQuestion ?? "", /Fenced question|Fenced sibling/);
});

test("real corpus preserves nearest useful sections without reviving known leakage", async () => {
  const repositoryRoot = path.resolve(import.meta.dirname, "../../..");
  const catalog = await buildCatalog(repositoryRoot);
  const contextFor = (question: string) => catalog.cards.find((card) => card.question === question)?.enrichment.questionContext;

  assert.equal(contextFor("Excel nima va undan foydalanish? — 1:15"), "Asosiy savollar");
  assert.equal(contextFor("What is a final class? | Final klass nima?"), "2. Keywords & Methods | Kalit So'zlar");
  assert.equal(contextFor("What is multiple inheritance? | Ko'p meros olish nima?"), "3. Inheritance & Relations | Meros va Munosabatlar");
  assert.equal(contextFor("What is constructor chaining? | Konstruktor zanjiri nima?"), "5. Advanced OOP | Ilg'or OOP");
  assert.equal(contextFor("What is dynamic binding? | Dinamik bog'lash nima?"), "6. Binding & Casting | Bog'lash va Konvertatsiya");
  assert.equal(contextFor("Grafda BFS orqali eng qisqa yo'l (unweighted) qanday topiladi? / How do you find the shortest path in an unweighted graph using BFS?"), "🔴 3. Ilg'or daraja / Advanced Level (39–58)");
  assert.doesNotMatch(catalog.cards.map((card) => card.enrichment.questionContext).join("\n"), /Toshkent Uzbekistan|ORDER BY salary/i);
});

test("a real single-fragment answer stays visible and grounded without repetition", async () => {
  const source = "# SAP\n\n## Fundamentals\n\n### Q1. Muvaffaqiyat kodi qaysi?\n\n`0`";
  const root = await fixture({ "docker.md": source });
  const card = (await buildCatalog(root)).cards[0]!;
  assert.equal(card.sourceGrounded, true);
  assert.equal(card.needsSource, false);
  assert.equal(card.expandedAnswer, "`0`");
  assert.equal(card.enrichment.answerSummary, "`0`");
  assert.equal(card.enrichment.answerDetail, "");
  for (const fragment of card.enrichment.groundingFragments) assert.ok(source.includes(fragment.text));
});

test("P02 contributes twenty unique practical source-grounded cards per requested domain", async () => {
  const repositoryRoot = path.resolve(import.meta.dirname, "../../..");
  const catalog = await buildCatalog(repositoryRoot);
  const domains = ["python", "javascript", "react", "nextjs", "nestjs", "fastapi", "vite", "postgresql"];
  const practicalCards = catalog.cards.filter((card) => card.sources.some((source) => source.sourcePath.startsWith("practical/")));

  assert.equal(practicalCards.length, 160);
  const practicalCardIds = new Set(practicalCards.map((card) => card.id));
  assert.equal(practicalCardIds.size, 160);
  assert.equal(catalog.nearDuplicates.filter((pair) => practicalCardIds.has(pair.leftCardId) || practicalCardIds.has(pair.rightCardId)).length, 0);
  assert.equal(catalog.summary.questionsNeedingSource, 0);
  for (const domain of domains) {
    const sourcePath = `practical/${domain}.md`;
    const cards = practicalCards.filter((card) => card.sources.some((source) => source.sourcePath === sourcePath));
    assert.equal(cards.length, 20, `${domain} must contribute exactly twenty canonical cards`);
    assert.equal(cards.every((card) => card.sourceGrounded && !card.needsSource), true);
    assert.equal(cards.every((card) => card.quality.score >= 8), true);
  }
  assert.equal(catalog.summary.questionsNeedingSource, 0);
});

test("real corpus regression totals stay stable", async () => {
  const repositoryRoot = path.resolve(import.meta.dirname, "../../..");
  const catalog = await buildCatalog(repositoryRoot);
  assert.deepEqual(catalog.summary, {
    pageCount: 55,
    extractedQuestionCount: 2419,
    canonicalQuestionCount: 2339,
    duplicateCount: 80,
    nearDuplicateCount: 4015,
    questionsNeedingSource: 0
  });
});
