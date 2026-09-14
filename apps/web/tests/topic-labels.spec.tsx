import { render, waitFor } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import App from "../src/App";

const sources = [
  "ai_engineering/basics.md",
  "business_analyst_skills.md",
  "data_analitik/01_excel_basics.md",
  "docker/basics.md",
  "dsa.md",
  "github/basics.md",
  "javascript/basics.md",
  "mind/basics.md",
  "odoo/basics.md",
  "practical/react.md",
  "python/basics.md",
  "resume_maslahatlari.md",
  "sap/basics.md",
  "sql/BASICS.md",
  "system_design.md",
  "system_design_quiz.md",
];

const score = { score: 8, label: "yetuk", reasons: ["aniq"] } as const;

afterEach(() => vi.unstubAllGlobals());

it("renders the complete current topic vocabulary with semantic labels and no Markdown suffix", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      schemaVersion: 1,
      generatedAt: "2026-09-12T00:00:00Z",
      summary: { pageCount: sources.length, extractedQuestionCount: 0, canonicalQuestionCount: 0, duplicateCount: 0, nearDuplicateCount: 0, questionsNeedingSource: 0 },
      items: sources.map((sourcePath, index) => ({ slug: `topic-${index}`, title: `Page ${index}`, sourcePath, cardCount: 1, contentScore: score, designReadinessScore: score, overallScore: score })),
      pagination: { page: 1, pageSize: 100, totalItems: sources.length, totalPages: 1 },
    }),
  }));

  const { container } = render(<App />);
  await waitFor(() => expect(container.querySelectorAll(".topic-card h3")).toHaveLength(15));
  expect([...container.querySelectorAll(".topic-card h3")].map((heading) => heading.textContent).sort()).toMatchInlineSnapshot(`
    [
      "AI Engineering",
      "Behavioral",
      "Business Analyst",
      "DSA",
      "Data Analytics",
      "Docker",
      "GitHub",
      "JavaScript",
      "Odoo",
      "Practical",
      "Python",
      "Resume",
      "SAP",
      "SQL",
      "System Design",
    ]
  `);
});
