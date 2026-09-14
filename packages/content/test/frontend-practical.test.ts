import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { buildCatalog } from "../src/index.js";

test("P03A replaces frontend placeholders with thirty practical React, Next.js, and Vite cards", async () => {
  const repositoryRoot = path.resolve(import.meta.dirname, "../../..");
  const catalog = await buildCatalog(repositoryRoot);
  const sourcePath = "javascript/frontend_react_next.md";
  const page = catalog.pages.find((candidate) => candidate.sourcePath === sourcePath)!;
  const rewritten = catalog.cards.filter((card) => card.sources.some((source) => source.sourcePath === sourcePath)
    && /^(?:React|Next\.js|Vite):/.test(card.question));
  const byDomain = (prefix: string) => rewritten.filter((card) => card.question.startsWith(prefix));

  assert.doesNotMatch(page.markdown, /Component\d+|Architecture Concept #|Advanced frontend scenario #/);
  assert.deepEqual([byDomain("React:").length, byDomain("Next.js:").length, byDomain("Vite:").length], [30, 30, 30]);
  assert.equal(new Set(rewritten.map((card) => card.id)).size, 90);
  assert.equal(new Set(rewritten.map((card) => card.answer)).size, 90);
  assert.equal(rewritten.some((card) => /Frontend muhandisligi bo'yicha #|real frontend va Next\.js intervyu savoli/.test(card.answer)), false);
  assert.equal(rewritten.every((card) => card.sourceGrounded && !card.needsSource && card.quality.score >= 8), true);

  const rewrittenIds = new Set(rewritten.map((card) => card.id));
  const p02Ids = new Set(catalog.cards.filter((card) => card.sources.some((source) => source.sourcePath.startsWith("practical/"))).map((card) => card.id));
  assert.equal(catalog.nearDuplicates.some((pair) => rewrittenIds.has(pair.leftCardId) && rewrittenIds.has(pair.rightCardId)), false);
  assert.equal(catalog.cards.some((card) => card.sources.some((source) => source.sourcePath === sourcePath)
    && card.sources.some((source) => source.sourcePath.startsWith("practical/"))), false);
  assert.equal(catalog.nearDuplicates.some((pair) => (rewrittenIds.has(pair.leftCardId) && p02Ids.has(pair.rightCardId))
    || (rewrittenIds.has(pair.rightCardId) && p02Ids.has(pair.leftCardId))), false);

  const section = (questionNumber: number) => {
    const match = page.markdown.match(new RegExp(`^## Q${questionNumber}\\.[\\s\\S]*?(?=^---$)`, "m"));
    assert.ok(match, `Q${questionNumber} must exist`);
    return match[0];
  };
  const distinctScenarioContracts: Array<[number, RegExp, string]> = [
    [11, /flushSync/, "https://react.dev/reference/react-dom/flushSync"],
    [19, /<Activity/, "https://react.dev/reference/react/Activity"],
    [45, /after\(/, "https://nextjs.org/docs/app/api-reference/functions/after"],
    [75, /import \{ version \} from '.\/metadata\.json'/, "https://vite.dev/guide/features#json"],
    [77, /__APP_VERSION__.*JSON\.stringify/, "https://vite.dev/config/shared-options#define"],
    [87, /assetsInclude: \['\*\*\/\*\.gltf'\]/, "https://vite.dev/config/shared-options#assetsinclude"],
    [91, /license: true/, "https://vite.dev/config/build-options#build-license"],
    [94, /server: \{ fs: \{ allow:/, "https://vite.dev/config/server-options#server-fs-allow"],
    [100, /appType: 'custom'/, "https://vite.dev/config/shared-options#apptype"]
  ];
  for (const [questionNumber, remedy, source] of distinctScenarioContracts) {
    assert.match(section(questionNumber), remedy);
    assert.ok(section(questionNumber).includes(source));
  }

  assert.match(section(60), /same-origin allowlist/);
  assert.ok(section(60).includes("https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html"));
  assert.doesNotMatch(section(66), /idempotency|constraint/i);
  assert.match(section(66), /progressive enhancement/i);
  assert.match(section(66), /useActionState.*pending/s);
  assert.doesNotMatch(section(66), /useFormStatus|validation|disable/i);
  assert.doesNotMatch(section(81), /upload|release ID|private observability/i);
  assert.match(section(81), /sourcemap: 'hidden'/);
});
