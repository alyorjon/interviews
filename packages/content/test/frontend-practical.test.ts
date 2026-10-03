import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { buildCatalog } from "../src/index.js";

test("frontend guide has 100 distinct, beginner-formatted, source-cited React/Next.js/Vite cards", async () => {
  const repositoryRoot = path.resolve(import.meta.dirname, "../../..");
  const catalog = await buildCatalog(repositoryRoot);
  const sourcePath = "javascript/frontend_react_next.md";
  const page = catalog.pages.find((candidate) => candidate.sourcePath === sourcePath)!;
  const cards = catalog.cards.filter((card) => card.sources.some((source) => source.sourcePath === sourcePath));

  assert.doesNotMatch(page.markdown, /Component\d+|Architecture Concept #|Advanced frontend scenario #/);
  assert.equal(cards.length, 100);
  assert.equal(new Set(cards.map((card) => card.answer)).size, 100, "every answer is distinct");
  for (const card of cards) {
    assert.match(card.answer, /\*\*Oddiy qilib aytganda:\*\*/, card.question);
    assert.match(card.answer, /\*\*Intervyuda shunday ayting:\*\*/, card.question);
    assert.ok(card.sourceGrounded && !card.needsSource, card.question);
  }

  const ids = new Set(cards.map((card) => card.id));
  const practicalIds = new Set(catalog.cards.filter((card) => card.sources.some((source) => source.sourcePath.startsWith("practical/"))).map((card) => card.id));
  assert.equal(catalog.nearDuplicates.some((pair) => ids.has(pair.leftCardId) && ids.has(pair.rightCardId)), false);
  assert.equal(catalog.nearDuplicates.some((pair) => (ids.has(pair.leftCardId) && practicalIds.has(pair.rightCardId))
    || (ids.has(pair.rightCardId) && practicalIds.has(pair.leftCardId))), false);

  const section = (questionNumber: number) => {
    const match = page.markdown.match(new RegExp(`^## Q${questionNumber}\\.[\\s\\S]*?(?=^## Q\\d+\\.|(?![\\s\\S]))`, "m"));
    assert.ok(match, `Q${questionNumber} must exist`);
    return match[0];
  };
  for (let questionNumber = 11; questionNumber <= 100; questionNumber++) {
    assert.match(section(questionNumber), /https:\/\/(?:react\.dev|nextjs\.org|vite\.dev|cheatsheetseries\.owasp\.org)\//, `Q${questionNumber} cites a primary source`);
  }
  const scenarioRemedies: Array<[number, RegExp, string]> = [
    [11, /flushSync/, "https://react.dev/reference/react-dom/flushSync"],
    [19, /<Activity/, "https://react.dev/reference/react/Activity"],
    [45, /after\(/, "https://nextjs.org/docs/app/api-reference/functions/after"],
    [60, /url\.origin !== origin/, "https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html"],
    [66, /useActionState/, "https://nextjs.org/docs/app/guides/forms"],
    [75, /import \{ version \} from "\.\/metadata\.json"/, "https://vite.dev/guide/features#json"],
    [77, /__APP_VERSION__: JSON\.stringify/, "https://vite.dev/config/shared-options#define"],
    [81, /sourcemap: "hidden"/, "https://vite.dev/config/build-options#build-sourcemap"],
    [85, /codeSplitting/, "https://vite.dev/guide/migration"],
    [87, /assetsInclude: \["\*\*\/\*\.gltf"\]/, "https://vite.dev/config/shared-options#assetsinclude"],
    [91, /license:/, "https://vite.dev/config/build-options#build-license"],
    [94, /fs: \{[\s\S]*allow:/, "https://vite.dev/config/server-options#server-fs-allow"],
    [100, /appType: "custom"/, "https://vite.dev/config/shared-options#apptype"],
  ];
  for (const [questionNumber, remedy, source] of scenarioRemedies) {
    assert.match(section(questionNumber), remedy, `Q${questionNumber} remedy`);
    assert.ok(section(questionNumber).includes(source), `Q${questionNumber} source`);
  }
  assert.match(section(66), /progressive enhancement/i);
  assert.match(section(10), /proxy\.ts/, "Next.js 16 renamed middleware to proxy");
  assert.match(section(48), /await params/, "Next.js 15+ params are async");
});
