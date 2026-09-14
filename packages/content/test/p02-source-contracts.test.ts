import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repositoryRoot = path.resolve(import.meta.dirname, "../../..");

async function answerFor(sourcePath: string, questionNumber: number): Promise<string> {
  const markdown = await readFile(path.join(repositoryRoot, sourcePath), "utf8");
  const match = markdown.match(new RegExp(`^## Q${questionNumber}\\.[^\\n]*\\n\\n([\\s\\S]*?)(?=^## Q\\d+\\.|\\Z)`, "m"));
  assert.ok(match, `${sourcePath} Q${questionNumber} must exist`);
  return match[1]!.trim();
}

test("P02 high-risk remedies cite primary docs that directly define their coordination primitive", async () => {
  const nestRetry = await answerFor("practical/nestjs.md", 18);
  assert.match(nestRetry, /UNIQUE \(message_id\)/);
  assert.match(nestRetry, /ON CONFLICT \(message_id\) DO NOTHING RETURNING/);
  assert.match(nestRetry, /https:\/\/www\.postgresql\.org\/docs\/current\/sql-insert\.html/);

  const nestScheduler = await answerFor("practical/nestjs.md", 19);
  assert.match(nestScheduler, /pg_try_advisory_xact_lock/);
  assert.match(nestScheduler, /false[^.]*job[^.]*o'tkazib/);
  assert.match(nestScheduler, /https:\/\/www\.postgresql\.org\/docs\/current\/functions-admin\.html#FUNCTIONS-ADVISORY-LOCKS/);

  const nextOrder = await answerFor("practical/nextjs.md", 15);
  assert.match(nextOrder, /UNIQUE \(idempotency_key\)/);
  assert.match(nextOrder, /ON CONFLICT \(idempotency_key\) DO NOTHING RETURNING/);
  assert.match(nextOrder, /https:\/\/www\.postgresql\.org\/docs\/current\/sql-insert\.html/);
});
