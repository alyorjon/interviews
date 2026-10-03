import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildCatalog, topicLabel, writeStaticBundle } from "../src/index.js";
import type { StaticManifest, StaticPage, StaticTopic } from "../src/index.js";

async function fixture(files: Record<string, string>): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "interviews-static-"));
  for (const [relative, body] of Object.entries(files)) {
    const target = path.join(root, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, body, "utf8");
  }
  return root;
}

test("topic labels cover the current vocabulary without Markdown suffixes", () => {
  const sources = [
    "ai_engineering/basics.md", "business_analyst_skills.md", "data_analitik/01_excel_basics.md", "docker/basics.md",
    "dsa.md", "github/basics.md", "javascript/basics.md", "mind/basics.md", "odoo/basics.md", "practical/react.md",
    "python/basics.md", "resume_maslahatlari.md", "sap/basics.md", "sql/BASICS.md", "system_design.md",
    "system_design_quiz.md",
  ];
  assert.deepEqual([...new Set(sources.map(topicLabel))].sort(), [
    "AI Engineering", "Behavioral", "Business Analyst", "DSA", "Data Analytics", "Docker", "GitHub",
    "JavaScript", "Odoo", "Practical", "Python", "Resume", "SAP", "SQL", "System Design",
  ]);
});

test("static bundle writes a small manifest and immutable, deduplicated shards", async () => {
  const shared = "## Q1. Closure nima?\n\nClosure tashqi scope qiymatini saqlaydi.";
  const root = await fixture({
    "javascript/basics.md": `# JS asoslari\n\n${shared}\n\n## Q2. Hoisting nima?\n\nE'lonlar yuqoriga ko'tariladi.`,
    "javascript/quiz.md": `# JS quiz\n\n${shared}`,
    "sql/basics.md": "# SQL\n\n## Q1. JOIN nima?\n\nJadvallarni bog'laydi.",
  });
  const output = path.join(root, "out");
  const manifest = await writeStaticBundle(await buildCatalog(root), output);

  const stored = JSON.parse(await readFile(path.join(output, "manifest.json"), "utf8")) as StaticManifest;
  assert.deepEqual(stored, manifest);
  assert.equal(manifest.schemaVersion, 2);
  assert.equal(manifest.cardCount, 3);
  assert.deepEqual(manifest.topics.map((topic) => [topic.id, topic.label, topic.cardCount]), [
    ["javascript", "JavaScript", 2],
    ["sql", "SQL", 1],
  ]);
  assert.equal(JSON.stringify(manifest).includes("markdown"), false, "manifest must not carry page bodies");

  const javascript = manifest.topics[0]!;
  assert.match(javascript.file, /^topics\/javascript\.[a-f0-9]{12}\.json$/);
  const topic = JSON.parse(await readFile(path.join(output, javascript.file), "utf8")) as StaticTopic;
  assert.equal(topic.cards.length, 2, "a card shared by two pages appears once per topic");

  const page = JSON.parse(await readFile(path.join(output, javascript.pages[0]!.file), "utf8")) as StaticPage;
  assert.equal(page.slug, "javascript-basics");
  assert.match(page.markdown, /Hoisting/);
  assert.deepEqual(Object.keys(page.cards[0]!).sort(), ["answer", "difficulty", "id", "page", "question", "topic"]);
});

test("static bundle replaces stale shards from an earlier build", async () => {
  const root = await fixture({ "sql/basics.md": "# SQL\n\n## Q1. JOIN nima?\n\nJadvallarni bog'laydi." });
  const output = path.join(root, "out");
  await writeStaticBundle(await buildCatalog(root), output);
  await writeFile(path.join(root, "sql/basics.md"), "# SQL\n\n## Q1. JOIN nima?\n\nIkki jadvalni kalit orqali bog'laydi.");
  await writeStaticBundle(await buildCatalog(root), output);
  assert.equal((await readdir(path.join(output, "pages"))).length, 1);
});
