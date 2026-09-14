import { useId, useState } from "react";
import type { CatalogCard } from "@interviews/content";
import { EyeIcon, EyeOffIcon, SparkIcon } from "./Icons";
import { ScoreBadge } from "./ScoreBadge";

const difficulty: Record<CatalogCard["metadata"]["difficulty"], string> = {
  beginner: "Boshlang'ich", intermediate: "O'rta", advanced: "Ilg'or", expert: "Ekspert", unspecified: "Daraja belgilanmagan"
};

function AnswerContent({ text }: { text: string }) {
  const blocks = text.split(/```/);
  return <div className="answer-copy">{blocks.map((block, index) => index % 2
    ? <pre key={index}><code>{block.replace(/^\w+\s*\n?/, "").trim()}</code></pre>
    : block.split(/\n+/).map((paragraph, paragraphIndex) => {
        const clean = paragraph.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        return clean ? <p key={`${index}-${paragraphIndex}`}>{clean}</p> : null;
      }))}</div>;
}

export function StudyCard({ card, confidence, onConfidence }: { card: CatalogCard; confidence?: number; onConfidence: (score: number) => void }) {
  const [revealed, setRevealed] = useState(false);
  const answerId = useId();
  const rubricId = useId();
  return <article className="study-card">
    <div className="card-topline">
      <div className="pills"><span className="pill">{difficulty[card.metadata.difficulty]}</span>{card.metadata.tags.slice(0, 2).map(tag => <span className="pill pill-muted" key={tag}>{tag}</span>)}</div>
      <ScoreBadge score={card.quality} />
    </div>
    <div className="question-block">
      <span className="eyebrow">Savol</span>
      <h2>{card.expandedQuestion || card.question}</h2>
      {card.expandedQuestion !== card.question && <p className="original-copy">Asl savol: {card.question}</p>}
    </div>
    <div className="quality-note" id={rubricId}>
      <SparkIcon/><div><strong>Nega {card.quality.score} ball?</strong><p>{card.quality.reasons.join(" · ")}</p></div>
    </div>
    <button className="reveal-button" type="button" onClick={() => setRevealed(value => !value)} aria-expanded={revealed} aria-controls={answerId} aria-describedby={rubricId}>
      {revealed ? <EyeOffIcon/> : <EyeIcon/>}<span>{revealed ? "Javobni yashirish" : "Javobni ko'rish"}</span><kbd>Enter</kbd>
    </button>
    {revealed && <section className="answer-block" id={answerId} aria-live="polite">
      <span className="eyebrow">Boyitilgan javob</span>
      <AnswerContent text={card.expandedAnswer || card.answer}/>
      {card.expandedAnswer !== card.answer && card.answer && <details><summary>Asl javobni ham ko'rish</summary><p>{card.answer}</p></details>}
      <div className="insight-grid">
        <div><span>Asosiy fikr</span><p>{card.metadata.keyPoint}</p></div>
        <div><span>Keyingi savol</span><p>{card.metadata.followUp}</p></div>
        <div><span>Keng tarqalgan xato</span><p>{card.metadata.commonMistake}</p></div>
      </div>
      <p className="source-line">Manba: <span>{card.sources.map(source => `${source.sourcePath}:${source.line}`).join(" · ")}</span></p>
      <fieldset className="confidence"><legend>Bu savolni qanchalik bilasiz?</legend><div className="confidence-scale">{Array.from({ length: 10 }, (_, index) => index + 1).map(score => <button key={score} type="button" className={confidence === score ? "selected" : ""} aria-pressed={confidence === score} aria-label={`O'z bilimim ${score}/10`} onClick={() => onConfidence(score)}>{score}</button>)}</div><p><span>Takrorlash kerak</span><span>Ishonchli bilaman</span></p></fieldset>
    </section>}
  </article>;
}
