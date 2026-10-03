import { expect, it } from "vitest";

import { parseInline, parseMarkdown } from "../src/lib/markdown";
import { parseRoute, routeHref } from "../src/lib/route";
import { shortTitle, splitBilingual } from "../src/lib/text";

it("routes round-trip and accept the legacy '#page/slug' form", () => {
  for (const route of [{ name: "dashboard" }, { name: "page", slug: "sql/ä b" }, { name: "review", topic: "all" }, { name: "review", topic: "sql" }] as const) {
    expect(parseRoute(routeHref(route))).toEqual(route);
  }
  expect(parseRoute("#page/javascript-basics")).toEqual({ name: "page", slug: "javascript-basics" });
  // Telegram puts its launch params in the hash; that must land on the dashboard.
  expect(parseRoute("#tgWebAppData=abc&tgWebAppVersion=8")).toEqual({ name: "dashboard" });
});

it("short titles drop decoration and marketing suffixes", () => {
  expect(shortTitle("🟩 2. JavaScript Backend (Node.js, Express & NestJS) — Real-World Interview Questions")).toBe("JavaScript Backend (Node.js, Express & NestJS)");
  expect(shortTitle("🇺🇿 2026 O'zbekiston Data Analyst Real Intervyu Savollari")).toBe("2026 O'zbekiston Data Analyst Real Intervyu Savollari");
  expect(shortTitle("100 OOP Interview Questions & Answers | Savol va Javoblar")).toBe("100 OOP Interview Questions & Answers");
  // Distinguishing suffixes stay, so two pages never collapse into the same label.
  expect(shortTitle("Python — YouTube Intervyu Savol-Javoblari")).toBe("Python — YouTube Intervyu Savol-Javoblari");
  expect(shortTitle("🧪 Excel Makroslar (VBA) — Nazariy va Amaliy Savollar")).toBe("Excel Makroslar (VBA) — Nazariy va Amaliy Savollar");
});

it("bilingual questions split only where both halves are real sentences", () => {
  expect(splitBilingual("What is Docker? | Docker nima?")).toEqual(["What is Docker?", "Docker nima?"]);
  expect(splitBilingual("Tell me about yourself. / O'zingiz haqingizda gapiring.")).toEqual(["Tell me about yourself.", "O'zingiz haqingizda gapiring."]);
  expect(splitBilingual("Context API / Redux farqi")).toEqual(["Context API / Redux farqi"]);
  expect(splitBilingual("TCP / UDP")).toEqual(["TCP / UDP"]);
});

it("markdown keeps code fences, rules, tables and continuation lines", () => {
  expect(parseMarkdown("~~~sql\nSELECT 1;\n~~~\n\n---\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- one\n  continued\n- two")).toEqual([
    { kind: "code", language: "sql", text: "SELECT 1;" },
    { kind: "rule" },
    { kind: "table", rows: [["a", "b"], ["1", "2"]] },
    { kind: "list", ordered: false, items: ["one continued", "two"] },
  ]);
});

it("inline markdown never produces script links and strips presentational HTML", () => {
  expect(parseInline("[x](javascript:alert(1))")).toEqual([{ kind: "text", text: "x" }]);
  expect(parseInline("[x](https://a.dev)")).toEqual([{ kind: "link", text: "x", href: "https://a.dev" }]);
  expect(parseInline("a<br>b")).toEqual([{ kind: "text", text: "a b" }]);
  expect(parseInline("**EN:** `code` and *em*").map((part) => part.kind)).toEqual(["strong", "text", "code", "text", "em"]);
  expect(parseInline("2 * 3 * 4")).toEqual([{ kind: "text", text: "2 * 3 * 4" }]);
});
