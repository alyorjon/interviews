import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "../src/App";

const score = { score: 8, label: "yetuk", reasons: ["aniq"] };
const card = { id: "shared-card", fingerprint: "one", question: "React state nima?", answer: "Asl javob", expandedQuestion: "React state nima?", expandedAnswer: "Komponent holati", enrichment: { questionContext: "React", answerSummary: "Komponent holati", answerDetail: "", groundingFragments: [] }, sourceGrounded: true, needsSource: false, options: [], quality: score, metadata: { difficulty: "intermediate", tags: ["react"], keyPoint: "Holat", followUp: "Qachon?", commonMistake: "Mutatsiya" }, sources: [{ sourcePath: "javascript/page-1.md", question: "React state nima?", line: 12 }] };
const page = (number: number) => ({ slug: `page-${number}`, title: `React sahifa ${number}`, sourcePath: `javascript/page-${number}.md`, markdown: `# React maqola ${number}\n\nMaqolaning to'liq matni.\n\n\`\`\`js\nconst safe = true;\n\`\`\`\n\n<script>bad()</script>`, cardIds: ["shared-card"], contentScore: score, designReadinessScore: score, overallScore: score });
const indexResponse = (apiPage: number) => ({ schemaVersion: 1, generatedAt: "2026-09-12T00:00:00Z", summary: { pageCount: 5, extractedQuestionCount: 2, canonicalQuestionCount: 1, duplicateCount: 1, nearDuplicateCount: 0, questionsNeedingSource: 0 }, items: (apiPage === 1 ? [1, 2, 3, 4] : [5]).map(number => ({ ...page(number), markdown: undefined, cardIds: undefined, cardCount: 1 })), pagination: { page: apiPage, pageSize: 4, totalItems: 5, totalPages: 2 } });

function mockApi() {
  vi.stubGlobal("fetch", vi.fn().mockImplementation(async (url: string) => {
    const pageMatch = url.match(/\/api\/pages\/page-(\d+)/);
    const body = pageMatch ? { page: page(Number(pageMatch[1])), cards: [card], pagination: { page: 1, pageSize: 100, totalItems: 1, totalPages: 1 } } : indexResponse(url.includes("page=2") ? 2 : 1);
    return { ok: true, json: async () => body };
  }));
}

beforeEach(() => { window.location.hash = ""; mockApi(); });
afterEach(() => vi.unstubAllGlobals());

it("aggregates catalog pages and navigates beyond page four into the full safe article", async () => {
  const user = userEvent.setup(); render(<App />);
  const fifth = await screen.findByRole("button", { name: /react sahifa 5 mavzusini ochish/i });
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining("page=2"), {
    headers: { "X-Telegram-Init-Data": "synthetic-init-data" },
  });
  await user.click(fifth);
  expect(await screen.findByRole("article", { name: /react sahifa 5 maqolasi/i })).toHaveTextContent("Maqolaning to'liq matni");
  expect(screen.getByText("const safe = true;")).toBeInTheDocument();
  expect(document.querySelector("script:not([src])")).toBeNull();
});

it("enters review and deduplicates one canonical card returned by several pages", async () => {
  const user = userEvent.setup(); render(<App />);
  await user.click(await screen.findByRole("button", { name: /takrorlashni boshlash/i }));
  expect(await screen.findByText("/ 1")).toBeVisible();
  expect(screen.getAllByRole("heading", { name: "React state nima?" })).toHaveLength(1);
});

it("falls back from null progress and saves only valid confidence", async () => {
  localStorage.setItem("interviews-progress-v1", "null");
  const user = userEvent.setup(); render(<App />);
  await user.click(await screen.findByRole("button", { name: /react sahifa 1 mavzusini ochish/i }));
  await user.click(await screen.findByRole("button", { name: /javobni ko'rish/i }));
  await user.click(screen.getByRole("button", { name: /bilimim 8\/10/i }));
  await waitFor(() => expect(JSON.parse(localStorage.getItem("interviews-progress-v1") ?? "{}")).toEqual({ "shared-card": 8 }));
});

it.each(["null", "{broken-json"])("treats corrupt persisted progress as empty: %s", async stored => {
  localStorage.setItem("interviews-progress-v1", stored); render(<App />);
  expect(await screen.findByText("Birinchi savolingiz tayyor")).toBeVisible();
});

it("shows a useful API failure state", async () => {
  vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response); render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Katalogni ochib bo'lmadi");
});

it("shows a locked state without making catalog requests outside Telegram", async () => {
  Object.defineProperty(window, "Telegram", { configurable: true, value: { WebApp: { initData: "" } } });
  render(<App />);

  expect(await screen.findByRole("alert")).toHaveTextContent("Telegram ichida oching");
  expect(fetch).not.toHaveBeenCalled();
});

it.each([401, 403])("shows the locked state when Telegram access returns %s", async status => {
  vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status } as Response);
  render(<App />);

  expect(await screen.findByRole("alert")).toHaveTextContent("Telegram kirishi tasdiqlanmadi");
});
