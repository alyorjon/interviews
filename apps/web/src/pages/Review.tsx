import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { Difficulty, StaticManifest, StudyCardData } from "@interviews/content";

import { ArrowIcon, BackIcon, SearchIcon } from "../components/Icons";
import { ProgressBar } from "../components/ProgressBar";
import { StatePanel } from "../components/StatePanel";
import { DIFFICULTY_LABEL, StudyCard } from "../components/StudyCard";
import { useAsync } from "../hooks/useAsync";
import { loadTopic } from "../lib/content";
import type { Scores } from "../lib/progress";
import { ALL_TOPICS, navigate } from "../lib/route";
import { button, cx, pageTitle } from "../lib/ui";

const field = "min-h-10 w-full rounded-lg border border-line bg-surface px-3";

type Status = "all" | "unrated" | "weak";

const STATUS_LABEL: Record<Status, string> = { all: "Hammasi", unrated: "Baholanmagan", weak: "Kuchsiz" };
const STATUS_HINT: Record<Status, string | undefined> = { all: undefined, unrated: undefined, weak: "Bahosi 5 yoki undan past" };
const LEVELS: Difficulty[] = ["beginner", "intermediate", "advanced", "expert", "unspecified"];

async function loadCards(manifest: StaticManifest, topic: string): Promise<StudyCardData[]> {
  const ids = topic === ALL_TOPICS
    ? manifest.topics.filter((item) => item.cardCount > 0).map((item) => item.id)
    : [topic];
  const shards = await Promise.all(ids.map(loadTopic));
  const unique = new Map<string, StudyCardData>();
  for (const shard of shards) for (const card of shard?.cards ?? []) if (!unique.has(card.id)) unique.set(card.id, card);
  return [...unique.values()];
}

function matches(card: StudyCardData, query: string): boolean {
  return !query || `${card.question}\n${card.answer}`.toLocaleLowerCase("uz").includes(query);
}

function isTyping(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (target.isContentEditable || /^(?:INPUT|SELECT|TEXTAREA)$/.test(target.tagName));
}

export function Review({ topic, manifest, scores, onRate }: {
  topic: string;
  manifest: StaticManifest;
  scores: Scores;
  onRate: (id: string, score: number) => void;
}) {
  const known = topic === ALL_TOPICS || manifest.topics.some((item) => item.id === topic);
  const state = useAsync(`${manifest.version}:${topic}`, () => loadCards(manifest, topic));
  const [status, setStatus] = useState<Status>("all");
  const [level, setLevel] = useState<Difficulty | "all">("all");
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search.trim().toLocaleLowerCase("uz"));
  const [index, setIndex] = useState(0);
  // Status filters use the scores as they were when the filter was chosen, so
  // rating the current card does not yank it out of the session.
  const [snapshot, setSnapshot] = useState(scores);
  useEffect(() => {
    setSnapshot(scores);
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, status, level, query]);

  const cards = state.status === "ready" ? state.data : [];
  const session = useMemo(() => cards.filter((card) => (level === "all" || card.difficulty === level)
    && (status === "all" || (status === "unrated" ? snapshot[card.id] === undefined : (snapshot[card.id] ?? 0) <= 5))
    && matches(card, query)), [cards, level, status, snapshot, query]);
  const position = Math.min(index, Math.max(session.length - 1, 0));
  const card = session[position];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isTyping(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight") setIndex((value) => Math.min(value + 1, session.length - 1));
      else if (event.key === "ArrowLeft") setIndex((value) => Math.max(value - 1, 0));
      else if (card && /^[0-9]$/.test(event.key)) onRate(card.id, event.key === "0" ? 10 : Number(event.key));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, onRate, session.length]);

  if (!known) return <StatePanel kind="missing" />;

  return (
    <>
      <header className="mb-8 grid gap-2">
        <h1 className={pageTitle}>Takrorlash</h1>
        <p className="max-w-[64ch] text-muted">Avval o'zingiz javob bering, keyin javobni ochib solishtiring va 1–10 baholang.</p>
      </header>

      <section className="mb-6 flex flex-wrap gap-2" aria-label="Takrorlash filtrlari">
        <label className="relative flex flex-[1_1_220px] items-center">
          <span className="sr-only">Savol yoki javob bo'yicha qidirish</span>
          <SearchIcon className="pointer-events-none absolute left-2.5 size-4.5 text-faint" />
          <input className={cx(field, "pl-9")} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Qidirish…" />
        </label>
        <label className="flex-[1_1_140px] sm:flex-none">
          <span className="sr-only">Yo'nalish</span>
          <select className={field} value={topic} onChange={(event) => navigate({ name: "review", topic: event.target.value })}>
            <option value={ALL_TOPICS}>Barcha yo'nalishlar</option>
            {manifest.topics.filter((item) => item.cardCount > 0).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label className="flex-[1_1_140px] sm:flex-none">
          <span className="sr-only">Qiyinlik</span>
          <select className={field} value={level} onChange={(event) => setLevel(event.target.value as Difficulty | "all")}>
            <option value="all">Barcha darajalar</option>
            {LEVELS.map((item) => <option key={item} value={item}>{DIFFICULTY_LABEL[item]}</option>)}
          </select>
        </label>
        <div className="flex w-full rounded-lg bg-surface-muted p-0.5 sm:w-auto" role="radiogroup" aria-label="Holat">
          {(Object.keys(STATUS_LABEL) as Status[]).map((item) => (
            <button
              key={item}
              type="button"
              role="radio"
              aria-checked={status === item}
              title={STATUS_HINT[item]}
              onClick={() => setStatus(item)}
              className={cx(
                "min-h-9 flex-1 rounded-md px-3 text-[13px] font-semibold",
                status === item ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg",
              )}
            >
              {STATUS_LABEL[item]}
            </button>
          ))}
        </div>
      </section>

      {state.status === "loading" && <StatePanel kind="loading" />}
      {state.status === "error" && <StatePanel kind="error" onRetry={state.retry} />}
      {state.status === "ready" && (card
        ? <>
            <div className="mb-3 flex items-center gap-3 text-[13px] text-muted tabular-nums">
              <span aria-live="polite"><strong className="text-fg">{position + 1}</strong> / {session.length}</span>
              <ProgressBar className="flex-1" value={position + 1} max={session.length} label="Sessiya bo'yicha joriy o'rin" />
            </div>
            <StudyCard key={card.id} card={card} score={scores[card.id]} onRate={(score) => onRate(card.id, score)} headingLevel={2} />
            <nav className="mt-4 flex justify-between gap-3" aria-label="Savollar bo'ylab">
              <button className={cx(button.secondary, "flex-1 sm:flex-none")} type="button" disabled={position === 0} onClick={() => setIndex(position - 1)}>
                <BackIcon /> Oldingi
              </button>
              <button className={cx(button.primary, "flex-1 sm:flex-none")} type="button" disabled={position >= session.length - 1} onClick={() => setIndex(position + 1)}>
                Keyingi <ArrowIcon />
              </button>
            </nav>
            <p className="mt-4 hidden text-center text-xs text-muted sm:block">Klaviatura: ← → — o'tish, 1–9 va 0 (=10) — baholash.</p>
          </>
        : <StatePanel kind="empty" />)}
    </>
  );
}
