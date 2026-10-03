import { type KeyboardEvent, useState } from "react";
import type { StaticManifest, StaticPage } from "@interviews/content";

import { BackIcon } from "../components/Icons";
import { Markdown } from "../components/Markdown";
import { StatePanel } from "../components/StatePanel";
import { StudyCard } from "../components/StudyCard";
import { useAsync } from "../hooks/useAsync";
import { loadPage } from "../lib/content";
import type { Scores } from "../lib/progress";
import { routeHref } from "../lib/route";
import { shortTitle } from "../lib/text";
import { cx, eyebrow, pageTitle } from "../lib/ui";

type Tab = "cards" | "article";

function PageContent({ page, scores, onRate }: { page: StaticPage; scores: Scores; onRate: (id: string, score: number) => void }) {
  // The article and the cards come from the same source; showing both at once
  // repeated every answer. Q&A first, full article on demand.
  const [tab, setTab] = useState<Tab>(page.cards.length ? "cards" : "article");
  const tabs: Array<{ id: Tab; label: string }> = [
    ...(page.cards.length ? [{ id: "cards" as const, label: `Savollar (${page.cards.length})` }] : []),
    { id: "article", label: "To'liq maqola" },
  ];
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const index = tabs.findIndex((item) => item.id === tab);
    const next = tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]!;
    setTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };
  const rated = page.cards.filter((card) => scores[card.id] !== undefined).length;

  return (
    <>
      {tabs.length > 1 && (
        <div className="mb-6 flex gap-1 border-b border-line" role="tablist" aria-label="Sahifa bo'limlari">
          {tabs.map((item) => (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              aria-controls={`panel-${item.id}`}
              tabIndex={tab === item.id ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={onTabKey}
              className={cx(
                "-mb-px min-h-11 border-b-2 px-3.5 text-sm font-semibold",
                tab === item.id ? "border-accent text-accent" : "border-transparent text-muted hover:text-fg",
              )}
            >{item.label}</button>
          ))}
        </div>
      )}
      <div id={`panel-${tab}`} role={tabs.length > 1 ? "tabpanel" : undefined} aria-labelledby={tabs.length > 1 ? `tab-${tab}` : undefined}>
        {tab === "cards"
          ? <>
              <p className="mb-3 text-[13px] text-muted">{rated} / {page.cards.length} savol baholangan</p>
              <ol className="grid grid-cols-1 gap-3">
                {page.cards.map((card) => (
                  <li key={card.id}>
                    <StudyCard card={card} score={scores[card.id]} onRate={(score) => onRate(card.id, score)} />
                  </li>
                ))}
              </ol>
            </>
          : <article aria-label={`${shortTitle(page.title)} maqolasi`}>
              {/* The source's own H1 duplicates the page title above. */}
              <Markdown source={page.markdown.replace(/^\s*#\s+.+\n/, "")} />
            </article>}
      </div>
    </>
  );
}

export function PageView({ slug, manifest, scores, onRate }: {
  slug: string;
  manifest: StaticManifest;
  scores: Scores;
  onRate: (id: string, score: number) => void;
}) {
  const state = useAsync(slug, () => loadPage(slug));
  const topic = manifest.topics.find((item) => item.pages.some((page) => page.slug === slug));
  const summary = topic?.pages.find((page) => page.slug === slug);
  if (!summary) return <StatePanel kind="missing" />;

  return (
    <>
      <a className="mb-4 inline-flex items-center gap-1 text-[13px] font-semibold [&_svg]:size-4" href={routeHref({ name: "dashboard" })}><BackIcon /> Yo'nalishlar</a>
      <header className="mb-8 grid gap-2">
        <p className={eyebrow}>{topic!.label}</p>
        <h1 className={pageTitle} title={summary.title}>{shortTitle(summary.title)}</h1>
      </header>
      {state.status === "loading" && <StatePanel kind="loading" />}
      {state.status === "error" && <StatePanel kind="error" onRetry={state.retry} />}
      {state.status === "ready" && (state.data
        ? <PageContent key={slug} page={state.data} scores={scores} onRate={onRate} />
        : <StatePanel kind="missing" />)}
    </>
  );
}
