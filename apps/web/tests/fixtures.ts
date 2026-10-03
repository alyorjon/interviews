import type { StaticManifest, StaticPage, StaticTopic, StudyCardData } from "@interviews/content";
import { vi } from "vitest";

export const closure: StudyCardData = {
  id: "card-aaaaaaaaaaaaaaaaaaaa",
  question: "What is a closure? | Closure nima?",
  answer: "**EN:** A closure keeps access to its outer scope.\n\n```js\nconst add = (a) => (b) => a + b;\n```",
  difficulty: "intermediate",
  topic: "javascript",
  page: "javascript-basics",
};

export const hoisting: StudyCardData = {
  id: "card-bbbbbbbbbbbbbbbbbbbb",
  question: "Hoisting nima?",
  answer: "E'lonlar scope boshiga ko'tariladi.",
  difficulty: "unspecified",
  topic: "javascript",
  page: "javascript-basics",
};

export const join: StudyCardData = {
  id: "card-cccccccccccccccccccc",
  question: "JOIN turlari qaysilar?",
  answer: "INNER",
  difficulty: "beginner",
  topic: "sql",
  page: "sql-quiz",
  options: ["A) INNER", "B) OUTER"],
  correctOption: "A",
};

export const page: StaticPage = {
  slug: "javascript-basics",
  title: "💛 1. JavaScript Basics — 100 Real-World Interview Questions",
  sourcePath: "javascript/basics.md",
  topic: "javascript",
  markdown: "# JavaScript Basics\n\nMaqolaning to'liq matni.\n\n<script>window.bad = true</script>\n\n[xavfli](javascript:alert(1)) va [MDN](https://developer.mozilla.org)",
  cards: [closure, hoisting],
};

export const manifest: StaticManifest = {
  schemaVersion: 2,
  version: "v1",
  generatedAt: "2026-09-25T00:00:00.000Z",
  pageCount: 2,
  cardCount: 3,
  topics: [
    {
      id: "javascript", label: "JavaScript", cardCount: 2, file: "topics/javascript.v1.json",
      pages: [{ slug: page.slug, title: page.title, sourcePath: page.sourcePath, cardCount: 2, file: "pages/javascript-basics.v1.json" }],
    },
    {
      id: "sql", label: "SQL", cardCount: 1, file: "topics/sql.v1.json",
      pages: [{ slug: "sql-quiz", title: "SQL quiz", sourcePath: "sql/quiz.md", cardCount: 1, file: "pages/sql-quiz.v1.json" }],
    },
  ],
};

const topics: Record<string, StaticTopic> = {
  "topics/javascript.v1.json": { id: "javascript", label: "JavaScript", cards: [closure, hoisting] },
  // The same card listed by two topics must still appear once in an all-topics review.
  "topics/sql.v1.json": { id: "sql", label: "SQL", cards: [join, closure] },
};

export type Route = (url: string, init?: RequestInit) => unknown | Response | undefined;

/** Serves the static bundle and an in-memory progress API; `override` can intercept any URL. */
export function mockBackend(override?: Route) {
  const server: Record<string, number> = {};
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const custom = override?.(url, init);
    if (custom instanceof Response) return custom;
    if (custom !== undefined) return Response.json(custom);
    if (url === "/data/manifest.json") return Response.json(manifest);
    if (url === "/data/pages/javascript-basics.v1.json") return Response.json(page);
    const topic = topics[url.replace("/data/", "")];
    if (topic) return Response.json(topic);
    if (url === "/api/me/progress") {
      if (init?.method === "PUT") Object.assign(server, (JSON.parse(String(init.body)) as { scores: Record<string, number> }).scores);
      return Response.json({ scores: server });
    }
    return new Response("not found", { status: 404 });
  });
  vi.stubGlobal("fetch", fetchMock);
  return { fetchMock, server };
}
