import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import App from "../src/App";
import { closure, hoisting, join, manifest, mockBackend } from "./fixtures";

function openInTelegram(initData = "signed-init-data") {
  Object.defineProperty(window, "Telegram", {
    configurable: true,
    value: { WebApp: { initData, ready: vi.fn(), expand: vi.fn() } },
  });
}

it("works in a plain browser: dashboard from the static manifest, progress kept locally", async () => {
  const { fetchMock } = mockBackend();
  render(<App />);

  expect(await screen.findByRole("heading", { level: 1, name: "Bugun nimani takrorlaymiz?" })).toBeVisible();
  expect(screen.getByRole("heading", { level: 3, name: "JavaScript" })).toBeVisible();
  expect(screen.getByRole("link", { name: /JavaScript Basics/ })).toHaveAttribute("href", "#/page/javascript-basics");
  expect(screen.getByText("Progress shu qurilmada saqlanadi")).toBeVisible();
  expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual(["/data/manifest.json"]);
});

it("page view shows each question once, with no audit noise, and the article on its own tab", async () => {
  mockBackend();
  const user = userEvent.setup();
  window.location.hash = "#/page/javascript-basics";
  render(<App />);

  expect(await screen.findByRole("heading", { level: 1, name: "JavaScript Basics" })).toBeVisible();
  const cardsTab = await screen.findByRole("tab", { name: "Savollar (2)" });
  expect(cardsTab).toHaveAttribute("aria-selected", "true");

  // Bilingual question: one heading plus a quiet translation, not one long line.
  expect(screen.getByRole("heading", { level: 3, name: "What is a closure?" })).toBeVisible();
  expect(screen.getByText("Closure nima?")).toBeVisible();
  expect(screen.getAllByRole("heading", { level: 3, name: "What is a closure?" })).toHaveLength(1);
  for (const noise of [/Asl savol/, /Asl javob/, /Qo'shimcha manba kerak/, /Nega \d+ ball/, /Boyitilgan javob/, /Manba:/]) {
    expect(screen.queryByText(noise)).not.toBeInTheDocument();
  }

  await user.click(screen.getAllByRole("button", { name: "Javobni ko'rish" })[0]!);
  expect(screen.getByText("A closure keeps access to its outer scope.")).toBeVisible();
  expect(screen.getAllByText(/A closure keeps access/)).toHaveLength(1);

  await user.click(screen.getByRole("tab", { name: "To'liq maqola" }));
  const article = screen.getByRole("article", { name: /maqolasi/ });
  expect(article).toHaveTextContent("Maqolaning to'liq matni.");
  expect(within(article).queryByRole("heading", { name: "JavaScript Basics" })).toBeNull();
  expect(document.querySelector("#root script, article script")).toBeNull();
  expect(within(article).queryByRole("link", { name: "xavfli" })).toBeNull();
  expect(within(article).getByRole("link", { name: "MDN" })).toHaveAttribute("rel", "noopener noreferrer");
});

it("review merges topic shards without repeating a card and supports keyboard rating", async () => {
  mockBackend();
  const user = userEvent.setup();
  window.location.hash = "#/review";
  render(<App />);

  expect(await screen.findByRole("heading", { level: 2, name: "What is a closure?" })).toBeVisible();
  expect(screen.getByText((_, element) => element?.tagName === "SPAN" && element.textContent === "1 / 3")).toBeVisible();

  await user.keyboard("7");
  await waitFor(() => expect(JSON.parse(localStorage.getItem("interviews-progress-v1") ?? "{}")).toEqual({ [closure.id]: 7 }));
  expect(screen.getByLabelText("Sizning bahoyingiz 7/10")).toBeVisible();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("heading", { level: 2, name: hoisting.question })).toBeVisible();
  await user.keyboard("{ArrowRight}");
  await user.click(screen.getByRole("button", { name: "Javobni ko'rish" }));
  const correct = screen.getByText("A) INNER").closest("li")!;
  expect(correct).toHaveTextContent("to'g'ri javob");
  expect(screen.getAllByText(/INNER/)).toHaveLength(1);
  expect(join.answer).toBe("INNER");
});

it("the 'unrated' filter keeps a just-rated card in place instead of skipping ahead", async () => {
  mockBackend();
  const user = userEvent.setup();
  window.location.hash = "#/review/javascript";
  render(<App />);

  await user.click(await screen.findByRole("radio", { name: "Baholanmagan" }));
  expect(screen.getByRole("heading", { level: 2, name: "What is a closure?" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Javobni ko'rish" }));
  await user.click(screen.getByRole("button", { name: "Bilimim 9/10" }));
  expect(screen.getByRole("heading", { level: 2, name: "What is a closure?" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Bilimim 9/10" })).toHaveAttribute("aria-pressed", "true");
});

it("inside Telegram, ratings are merged with the server copy and sent in one batch", async () => {
  openInTelegram();
  localStorage.setItem("interviews-progress-v1", JSON.stringify({ [hoisting.id]: 3 }));
  const { fetchMock, server } = mockBackend((url, init) => {
    if (url === "/api/me/progress" && !init?.method) return { scores: { [join.id]: 8 } };
    return undefined;
  });
  const user = userEvent.setup();
  window.location.hash = "#/review/javascript";
  render(<App />);

  await waitFor(() => expect(screen.getByText("Progress saqlandi")).toBeVisible());
  // Local-only score was pushed; the server-only score was pulled in.
  expect(server).toEqual({ [hoisting.id]: 3 });
  expect(JSON.parse(localStorage.getItem("interviews-progress-v1")!)).toEqual({ [hoisting.id]: 3, [join.id]: 8 });

  await user.keyboard("5");
  await user.keyboard("6");
  const putsBefore = fetchMock.mock.calls.filter(([, init]) => init?.method === "PUT").length;
  act(() => { window.dispatchEvent(new Event("pagehide")); });
  await waitFor(() => expect(server[closure.id]).toBe(6));
  const puts = fetchMock.mock.calls.filter(([, init]) => init?.method === "PUT");
  expect(puts.length - putsBefore).toBe(1);
  expect(puts.at(-1)![1]).toMatchObject({ keepalive: true, headers: expect.objectContaining({ "X-Telegram-Init-Data": "signed-init-data" }) });
});

it("a rejected Telegram session falls back to local progress without retry loops", async () => {
  openInTelegram("expired");
  const { fetchMock } = mockBackend((url) => url === "/api/me/progress" ? new Response("", { status: 401 }) : undefined);
  render(<App />);
  expect(await screen.findByText(/Telegram sessiyasi rad etildi/)).toBeVisible();
  expect(fetchMock.mock.calls.filter(([url]) => url === "/api/me/progress")).toHaveLength(1);
});

it.each(["null", "{broken-json", "[1,2]", JSON.stringify({ x: 99 })])("treats corrupt stored progress as empty: %s", async (stored) => {
  localStorage.setItem("interviews-progress-v1", stored);
  mockBackend();
  render(<App />);
  expect(await screen.findByRole("link", { name: /Takrorlashni boshlash/ })).toBeVisible();
});

it("shows a retryable error when the manifest cannot be loaded", async () => {
  let fail = true;
  mockBackend((url) => url === "/data/manifest.json" && fail ? new Response("", { status: 503 }) : undefined);
  const user = userEvent.setup();
  render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Ma'lumotni ochib bo'lmadi");
  fail = false;
  await user.click(screen.getByRole("button", { name: "Qayta urinish" }));
  expect(await screen.findByRole("heading", { level: 1, name: "Bugun nimani takrorlaymiz?" })).toBeVisible();
});

it("recovers when a deploy replaced the shard an open tab still points to", async () => {
  let deployed = false;
  mockBackend((url, init) => {
    if (url === "/data/manifest.json" && deployed) {
      expect(init?.cache).toBe("no-cache");
      return { ...manifest, topics: manifest.topics.map((topic) => ({ ...topic, pages: topic.pages.map((item) => ({ ...item, file: item.file.replace("v1", "v2") })) })) };
    }
    if (url === "/data/pages/javascript-basics.v1.json" && deployed) return new Response("", { status: 404 });
    if (url === "/data/pages/javascript-basics.v2.json") return { slug: "javascript-basics", title: "New", sourcePath: "javascript/basics.md", topic: "javascript", markdown: "", cards: [hoisting] };
    return undefined;
  });
  render(<App />);
  await screen.findByRole("heading", { level: 1, name: "Bugun nimani takrorlaymiz?" });
  deployed = true;
  window.location.hash = "#/page/javascript-basics";
  act(() => { window.dispatchEvent(new HashChangeEvent("hashchange")); });
  expect(await screen.findByRole("heading", { level: 3, name: hoisting.question })).toBeVisible();
});

it("unknown pages and topics show a not-found state instead of an empty screen", async () => {
  mockBackend();
  window.location.hash = "#/page/missing";
  render(<App />);
  expect(await screen.findByText("Sahifa topilmadi")).toBeVisible();
});

it("a batch the server rejects (4xx) is dropped instead of being retried forever", async () => {
  openInTelegram();
  const { fetchMock } = mockBackend((url, init) => url === "/api/me/progress" && init?.method === "PUT" ? new Response("", { status: 400 }) : undefined);
  const user = userEvent.setup();
  window.location.hash = "#/review/javascript";
  render(<App />);
  await screen.findByRole("heading", { level: 2, name: "What is a closure?" });
  await waitFor(() => expect(screen.getByText("Progress saqlandi")).toBeVisible());

  await user.keyboard("4");
  act(() => { window.dispatchEvent(new Event("pagehide")); });
  await waitFor(() => expect(fetchMock.mock.calls.filter(([, init]) => init?.method === "PUT")).toHaveLength(1));
  await waitFor(() => expect(localStorage.getItem("interviews-progress-pending-v1")).toBe("{}"));
  act(() => { window.dispatchEvent(new Event("pagehide")); });
  expect(fetchMock.mock.calls.filter(([, init]) => init?.method === "PUT")).toHaveLength(1);
  expect(JSON.parse(localStorage.getItem("interviews-progress-v1")!)).toEqual({ [closure.id]: 4 });
});

it("when the first server sync fails offline, it is retried once the network is back", async () => {
  openInTelegram();
  let online = false;
  mockBackend((url) => {
    if (url === "/api/me/progress" && !online) throw new TypeError("Failed to fetch");
    return undefined;
  });
  render(<App />);
  expect(await screen.findByText(/Oflayn/)).toBeVisible();
  online = true;
  act(() => { window.dispatchEvent(new Event("online")); });
  expect(await screen.findByText("Progress saqlandi")).toBeVisible();
});
