import { useId, useState } from "react";
import type { Difficulty, StudyCardData } from "@interviews/content";

import { splitBilingual } from "../lib/text";
import { cx, panel } from "../lib/ui";
import { EyeIcon, EyeOffIcon } from "./Icons";
import { InlineText, Markdown } from "./Markdown";

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: "Boshlang'ich",
  intermediate: "O'rta",
  advanced: "Ilg'or",
  expert: "Ekspert",
  unspecified: "Belgilanmagan",
};

const DIFFICULTY_TONE: Record<Difficulty, string> = {
  beginner: "bg-success-soft text-success",
  intermediate: "bg-surface-muted text-muted",
  advanced: "bg-warning-soft text-warning",
  expert: "bg-warning-soft text-warning",
  unspecified: "bg-surface-muted text-muted",
};

const SELECTED_TONE = {
  low: "border-danger bg-danger-soft text-danger",
  mid: "border-warning bg-warning-soft text-warning",
  high: "border-success bg-success-soft text-success",
} as const;

const SCALE = Array.from({ length: 10 }, (_, index) => index + 1);

function ConfidenceScale({ score, onRate }: { score?: number; onRate: (score: number) => void }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-2 text-[13px] font-semibold">Bu savolni qanchalik bilasiz?</legend>
      <div className="grid grid-cols-5 gap-1 sm:grid-cols-10">
        {SCALE.map((value) => {
          const band = value <= 4 ? "low" : value <= 7 ? "mid" : "high";
          const selected = score === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              aria-label={`Bilimim ${value}/10`}
              onClick={() => onRate(value)}
              className={cx(
                "min-h-10 rounded-lg border text-sm font-semibold tabular-nums transition-colors",
                selected ? SELECTED_TONE[band] : "border-line bg-surface hover:border-line-strong hover:bg-surface-muted",
              )}
            >{value}</button>
          );
        })}
      </div>
      <p className="mt-1.5 flex justify-between text-xs text-faint" aria-hidden="true">
        <span>Takrorlash kerak</span><span>Ishonchli bilaman</span>
      </p>
    </fieldset>
  );
}

function Options({ options, correct }: { options: string[]; correct?: string }) {
  return (
    <ul className="grid grid-cols-1 gap-1.5">
      {options.map((option) => {
        const isCorrect = Boolean(correct) && option.toUpperCase().startsWith(`${correct})`);
        return (
          <li key={option} className={cx(
            "rounded-lg border px-3 py-2",
            isCorrect ? "border-success bg-success-soft font-semibold text-success" : "border-line",
          )}>
            <InlineText text={option} />
            {isCorrect && <span className="sr-only"> — to'g'ri javob</span>}
          </li>
        );
      })}
    </ul>
  );
}

export function StudyCard({ card, score, onRate, headingLevel = 3 }: {
  card: StudyCardData;
  score?: number;
  onRate: (score: number) => void;
  headingLevel?: 2 | 3;
}) {
  const [revealed, setRevealed] = useState(false);
  const answerId = useId();
  const Heading = `h${headingLevel}` as const;
  const [question, translation] = splitBilingual(card.question);
  const showMeta = card.difficulty !== "unspecified" || score !== undefined;

  return (
    <article className={cx(panel, "grid min-w-0 grid-cols-1 gap-3 p-4 sm:p-5")}>
      {showMeta && (
        <div className="flex items-center gap-2">
          {card.difficulty !== "unspecified" && (
            <span className={cx("rounded-full px-2 py-px text-xs font-semibold", DIFFICULTY_TONE[card.difficulty])}>
              {DIFFICULTY_LABEL[card.difficulty]}
            </span>
          )}
          {score !== undefined && (
            <span className="ml-auto text-xs font-bold text-accent tabular-nums" aria-label={`Sizning bahoyingiz ${score}/10`}>{score}/10</span>
          )}
        </div>
      )}
      <Heading className={cx("font-semibold tracking-tight [overflow-wrap:anywhere]", headingLevel === 2 ? "text-[19px]" : "text-base")}>
        <InlineText text={question} />
      </Heading>
      {translation && <p className="-mt-1.5 text-sm text-muted"><InlineText text={translation} /></p>}
      <button
        type="button"
        onClick={() => setRevealed((value) => !value)}
        aria-expanded={revealed}
        aria-controls={answerId}
        className="inline-flex min-h-10 items-center gap-2 justify-self-start rounded-lg bg-accent-soft px-3.5 text-[13px] font-semibold text-accent [&_svg]:size-4.5"
      >
        {revealed ? <EyeOffIcon /> : <EyeIcon />}
        <span>{revealed ? "Javobni yashirish" : "Javobni ko'rish"}</span>
      </button>
      <div id={answerId} hidden={!revealed} className="grid min-w-0 grid-cols-1 gap-4 border-t border-line pt-4">
        {revealed && <>
          {card.options?.length
            ? <Options options={card.options} correct={card.correctOption} />
            : card.answer.trim()
              ? <Markdown source={card.answer} headingOffset={3} />
              : <p className="text-muted">Manbada bu savolga javob yozilmagan.</p>}
          <ConfidenceScale score={score} onRate={onRate} />
        </>}
      </div>
    </article>
  );
}
