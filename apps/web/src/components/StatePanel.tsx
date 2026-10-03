import { button, cx, panel } from "../lib/ui";

const CONTENT = {
  loading: ["Yuklanmoqda", "Bir soniya…"],
  error: ["Ma'lumotni ochib bo'lmadi", "Aloqa uzildi. Bir ozdan keyin qayta urinib ko'ring."],
  empty: ["Hech narsa topilmadi", "Qidiruv yoki filtrni o'zgartirib ko'ring."],
  missing: ["Sahifa topilmadi", "Havola eskirgan bo'lishi mumkin. Bosh sahifadan qayta tanlang."],
} as const;

export type PanelKind = keyof typeof CONTENT;

export function StatePanel({ kind, onRetry }: { kind: PanelKind; onRetry?: () => void }) {
  const [title, body] = CONTENT[kind];
  return (
    <div
      className={cx(panel, "grid justify-items-center gap-2 border-dashed border-line-strong px-6 py-12 text-center")}
      role={kind === "error" ? "alert" : "status"}
      aria-busy={kind === "loading" || undefined}
    >
      {kind === "loading" && <span className="size-6 animate-spin rounded-full border-3 border-line border-t-accent" aria-hidden="true" />}
      <h2 className="text-base font-bold">{title}</h2>
      <p className="max-w-[44ch] text-muted">{body}</p>
      {kind === "error" && onRetry && <button className={cx(button.primary, "mt-2")} type="button" onClick={onRetry}>Qayta urinish</button>}
      {kind === "missing" && <a className={cx(button.secondary, "mt-2")} href="#/">Bosh sahifa</a>}
    </div>
  );
}
