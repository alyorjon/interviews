import type { StaticManifest } from "@interviews/content";

import { ArrowIcon } from "../components/Icons";
import type { Scores } from "../lib/progress";
import { routeHref } from "../lib/route";
import { shortTitle } from "../lib/text";
import { button, cx, panel, pageTitle, sectionTitle } from "../lib/ui";

function Stat({ value, label, hint }: { value: string; label: string; hint: string }) {
  return (
    <div className={cx(panel, "flex items-baseline justify-between rounded-xl p-4 sm:block")}>
      <dt className="text-xs font-semibold text-muted">{label}</dt>
      <dd className="flex items-baseline gap-1.5 sm:mt-1">
        <strong className="text-2xl font-bold tracking-tight tabular-nums">{value}</strong>
        <span className="text-xs text-faint">{hint}</span>
      </dd>
    </div>
  );
}

export function Dashboard({ manifest, scores }: { manifest: StaticManifest; scores: Scores }) {
  const values = Object.values(scores);
  const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  const weak = values.filter((value) => value <= 5).length;
  const format = (value: number) => value.toLocaleString("uz-UZ");

  return (
    <>
      <header className="mb-8 grid justify-items-start gap-2">
        <h1 className={pageTitle}>Bugun nimani takrorlaymiz?</h1>
        <p className="max-w-[64ch] text-muted">
          {format(manifest.cardCount)} ta savol, {manifest.topics.length} ta yo'nalish. Savolni o'qing, javobni
          ochishdan oldin o'zingiz javob bering, keyin bilimingizni 1–10 baholang.
        </p>
        <a className={cx(button.primary, "mt-3")} href={routeHref({ name: "review", topic: "all" })}>
          {values.length ? "Takrorlashni davom ettirish" : "Takrorlashni boshlash"} <ArrowIcon />
        </a>
      </header>

      <dl className="mb-10 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3" aria-label="Sizning natijangiz">
        <Stat label="Baholangan" value={format(values.length)} hint={`/ ${format(manifest.cardCount)}`} />
        <Stat label="O'rtacha ishonch" value={values.length ? average.toFixed(1) : "—"} hint="/ 10" />
        <Stat label="Takrorlash kerak" value={format(weak)} hint="baho ≤ 5" />
      </dl>

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className={cx(sectionTitle, "mb-4")}>Yo'nalishlar</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {manifest.topics.map((topic) => (
            <article className={cx(panel, "flex min-w-0 flex-col gap-3 p-5")} key={topic.id}>
              <header>
                <h3 className="text-base font-bold tracking-tight">{topic.label}</h3>
                <p className="text-[13px] text-muted">{topic.pages.length} sahifa · {format(topic.cardCount)} savol</p>
              </header>
              <ul className="border-t border-line">
                {topic.pages.map((page) => (
                  <li key={page.slug}>
                    <a
                      className="flex min-h-10 items-center justify-between gap-3 border-b border-line py-1.5 text-sm text-fg hover:text-accent"
                      href={routeHref({ name: "page", slug: page.slug })}
                      title={page.title}
                    >
                      <span className="truncate">{shortTitle(page.title)}</span>
                      <span className="flex-none text-xs text-faint tabular-nums">{page.cardCount || "maqola"}</span>
                    </a>
                  </li>
                ))}
              </ul>
              {topic.cardCount > 0 && (
                <a className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold [&_svg]:size-4" href={routeHref({ name: "review", topic: topic.id })}>
                  {topic.label} bo'yicha takrorlash <ArrowIcon />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
