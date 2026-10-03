import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import App from "../src/App";
import { mockBackend } from "./fixtures";

it("mobile drawer traps focus, closes on Escape, scrim and navigation, and restores focus", async () => {
  mockBackend();
  const user = userEvent.setup();
  render(<App />);
  const menu = await screen.findByRole("button", { name: "Menyuni ochish" });
  expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(menu).toHaveAttribute("aria-controls", "primary-navigation");

  await user.click(menu);
  const drawer = screen.getByRole("dialog", { name: "Asosiy navigatsiya" });
  expect(drawer).toHaveAttribute("aria-modal", "true");
  expect(drawer).toHaveAttribute("data-open", "true");
  const first = screen.getByRole("link", { name: "Bilimxona IT intervyuga tayyorgarlik" });
  expect(first).toHaveFocus();
  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(screen.getByRole("button", { name: /rejim/ })).toHaveFocus();
  await user.tab();
  expect(first).toHaveFocus();

  await user.keyboard("{Escape}");
  expect(drawer).not.toHaveAttribute("data-open");
  expect(menu).toHaveFocus();

  await user.click(menu);
  await user.click(screen.getByTestId("drawer-scrim"));
  expect(menu).toHaveFocus();

  await user.click(menu);
  await user.click(screen.getByRole("link", { name: "Takrorlash" }));
  await waitFor(() => expect(document.getElementById("main-content")).toHaveFocus());
  expect(document.getElementById("primary-navigation")).not.toHaveAttribute("data-open");
});

it("theme toggle persists and switches the document theme", async () => {
  mockBackend();
  const user = userEvent.setup();
  document.documentElement.dataset.theme = "light";
  render(<App />);
  await user.click(await screen.findByRole("button", { name: "Tungi rejim" }));
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem("theme")).toBe("dark");
  expect(screen.getByRole("button", { name: "Yorug' rejim" })).toBeVisible();
});

it("theme toggle still works when storage throws (private mode)", async () => {
  mockBackend();
  const user = userEvent.setup();
  const original = localStorage.setItem;
  localStorage.setItem = () => { throw new DOMException("quota", "QuotaExceededError"); };
  try {
    document.documentElement.dataset.theme = "light";
    render(<App />);
    await user.click(await screen.findByRole("button", { name: "Tungi rejim" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
  } finally {
    localStorage.setItem = original;
  }
});
