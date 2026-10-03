import { cx } from "../lib/ui";

export function ProgressBar({ value, max, label, className }: { value: number; max: number; label: string; className?: string }) {
  const percent = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      className={cx("h-1.5 overflow-hidden rounded-full bg-surface-muted", className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <span className="block h-full rounded-full bg-accent transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${percent}%` }} />
    </div>
  );
}
