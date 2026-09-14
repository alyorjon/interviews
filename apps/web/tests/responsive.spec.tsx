import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "../src/App";

it("renders mobile navigation and a fluid app boundary at 360px", async () => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 360 });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ schemaVersion: 1, generatedAt: "now", summary: { pageCount: 1, extractedQuestionCount: 0, canonicalQuestionCount: 0, duplicateCount: 0, nearDuplicateCount: 0, questionsNeedingSource: 0 }, items: [{ slug: "safe", title: "Mobil sahifa", sourcePath: "mobile/safe.md", cardCount: 0, contentScore: { score: 5, label: "rivojlanmoqda", reasons: ["audit"] }, designReadinessScore: { score: 8, label: "yetuk", reasons: ["responsive"] }, overallScore: { score: 7, label: "yetuk", reasons: ["tayyor"] } }], pagination: { page: 1, pageSize: 100, totalItems: 1, totalPages: 1 } }) }));
  const { container } = render(<App />);
  const user = userEvent.setup();
  const menu = await screen.findByRole("button", { name: "Menyuni ochish" });
  expect(menu).toBeInTheDocument();
  expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(menu).toHaveAttribute("aria-controls", "primary-navigation");
  expect(container.querySelector(".app-shell")).toBeInTheDocument();
  expect([...container.querySelectorAll<HTMLElement>("[style]")].every(element => !/width:\s*[4-9]\d\dpx/.test(element.getAttribute("style") ?? ""))).toBe(true);
  await user.click(menu);
  const sidebar = screen.getByRole("dialog", { name: "Asosiy navigatsiya" });
  const firstNavigationItem = screen.getByRole("button", { name: /Bosh sahifa/ });
  expect(sidebar).toHaveClass("is-open");
  expect(sidebar).toHaveAttribute("aria-modal", "true");
  expect(menu).toHaveAttribute("aria-expanded", "true");
  expect(firstNavigationItem).toHaveFocus();
  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(screen.getByRole("button", { name: "Takrorlash" })).toHaveFocus();
  await user.tab();
  expect(firstNavigationItem).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(sidebar).not.toHaveClass("is-open");
  expect(menu).toHaveFocus();

  await user.click(menu);
  const scrim = container.querySelector<HTMLElement>(".drawer-scrim");
  expect(scrim).toBeInTheDocument();
  await user.click(scrim!);
  expect(menu).toHaveFocus();

  await user.click(menu);
  await user.click(firstNavigationItem);
  expect(menu).toHaveFocus();
  vi.unstubAllGlobals();
});
