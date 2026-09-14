import type { QualityScore } from "@interviews/content";

export function ScoreBadge({ score, compact = false }: { score: QualityScore; compact?: boolean }) {
  const tone = score.score >= 8 ? "high" : score.score >= 5 ? "medium" : "low";
  return <span className={`score-badge score-${tone}${compact ? " score-compact" : ""}`} title={score.reasons.join(" · ")} aria-label={`Sifat bahosi ${score.score}/10, ${score.label}`}>
    <strong>{score.score}</strong><span>/10</span>{!compact && <em>{score.label}</em>}
  </span>;
}
