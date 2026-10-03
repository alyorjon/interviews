import { type ReactNode, useEffect, useRef, useState } from "react";

import type { SyncStatus } from "../hooks/useProgress";
import type { Theme } from "../hooks/useTheme";
import { type Route, routeHref } from "../lib/route";
import { cx } from "../lib/ui";
import { BookIcon, HomeIcon, MenuIcon, MoonIcon, SparkIcon, SunIcon } from "./Icons";
import { ProgressBar } from "./ProgressBar";

const SYNC_TONE: Record<SyncStatus, string> = {
  local: "text-faint",
  syncing: "text-faint",
  synced: "text-success",
  offline: "text-warning",
  denied: "text-warning",
};

const SYNC_LABEL: Record<SyncStatus, string> = {
  local: "Progress shu qurilmada saqlanadi",
  syncing: "Sinxronlanmoqda…",
  synced: "Progress saqlandi",
  offline: "Oflayn — keyinroq yuboriladi",
  denied: "Telegram sessiyasi rad etildi — progress shu qurilmada",
};

function NavLink({ route, current, icon, children }: { route: Route; current: Route; icon: ReactNode; children: ReactNode }) {
  const active = route.name === current.name;
  return (
    <a
      href={routeHref(route)}
      aria-current={active ? "page" : undefined}
      className={cx(
        "flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-semibold [&_svg]:size-4.5",
        active ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-muted hover:text-fg",
      )}
    >
      {icon}{children}
    </a>
  );
}

export function Layout({ route, theme, onToggleTheme, rated, total, sync, children }: {
  route: Route;
  theme: Theme;
  onToggleTheme: () => void;
  rated: number;
  total: number;
  sync: SyncStatus;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const close = () => {
    setOpen(false);
    menuRef.current?.focus();
  };

  // Navigation closes the drawer and moves focus to the new content, as a full page load would.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    setOpen(false);
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [route]);

  useEffect(() => {
    if (!open) return;
    const focusable = [...(sidebarRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])];
    const first = focusable[0];
    const last = focusable.at(-1);
    first?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      } else if (event.key === "Tab" && first && last) {
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Scores for cards retired from the catalog still count in `rated`; never show more than 100%.
  const percent = total ? Math.min(100, Math.round((rated / total) * 100)) : 0;

  return (
    <div className="min-h-screen">
      <a className="fixed top-2 left-2 z-50 -translate-y-[200%] rounded-lg border border-line bg-surface px-3 py-2 focus:translate-y-0" href="#main-content">
        Asosiy mazmunga o'tish
      </a>
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-bg px-4 lg:hidden">
        <button
          ref={menuRef}
          className="grid size-10 place-items-center rounded-lg border border-line [&_svg]:size-5"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menyuni ochish"
          aria-expanded={open}
          aria-controls="primary-navigation"
        ><MenuIcon /></button>
        <a className="text-base font-bold text-fg" href="#/">Bilimxona</a>
      </header>

      <div
        className={cx(
          "fixed inset-0 z-25 bg-scrim transition-opacity motion-reduce:transition-none lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        data-testid="drawer-scrim"
        onClick={close}
      />
      <aside
        ref={sidebarRef}
        id="primary-navigation"
        data-open={open || undefined}
        className={cx(
          "fixed inset-y-0 left-0 z-30 flex w-66 flex-col gap-6 overflow-y-auto border-r border-line bg-surface px-4 py-6",
          "transition-[translate,visibility] motion-reduce:transition-none lg:visible lg:translate-x-0",
          // `invisible` also removes the off-screen drawer from the tab order on mobile.
          open ? "visible translate-x-0" : "invisible -translate-x-full",
        )}
        aria-label="Asosiy navigatsiya"
        role={open ? "dialog" : undefined}
        aria-modal={open || undefined}
      >
        <a className="flex items-center gap-3 px-2 text-fg hover:text-fg" href="#/">
          <span className="grid size-9 flex-none place-items-center rounded-[10px] bg-accent text-on-accent [&_svg]:size-5"><BookIcon /></span>
          <span className="grid leading-snug">
            <strong className="sidebar-title text-base font-bold tracking-tight">Bilimxona</strong>
            <span className="text-xs text-muted">IT intervyuga tayyorgarlik</span>
          </span>
        </a>
        <nav className="grid gap-0.5">
          <NavLink route={{ name: "dashboard" }} current={route} icon={<HomeIcon />}>Bosh sahifa</NavLink>
          <NavLink route={{ name: "review", topic: "all" }} current={route} icon={<SparkIcon />}>Takrorlash</NavLink>
        </nav>
        <section className="grid gap-2 border-t border-line px-2 pt-4 text-xs" aria-label="Umumiy progress">
          <p className="flex justify-between text-muted"><span>O'zlashtirildi</span><strong className="text-[13px] text-fg">{percent}%</strong></p>
          <ProgressBar value={rated} max={total} label="Baholangan savollar ulushi" />
          <p className="text-faint">{rated.toLocaleString("uz-UZ")} / {total.toLocaleString("uz-UZ")} savol baholangan</p>
          <p className={SYNC_TONE[sync]} role="status">{SYNC_LABEL[sync]}</p>
        </section>
        <button
          id="theme-toggle"
          className="mt-auto flex min-h-10 items-center gap-2.5 rounded-lg border border-line px-3 text-[13px] font-semibold hover:bg-surface-muted [&_svg]:size-4.5"
          type="button"
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          <span>{theme === "dark" ? "Yorug' rejim" : "Tungi rejim"}</span>
        </button>
      </aside>

      <main id="main-content" tabIndex={-1} className="min-h-screen outline-none lg:ml-66">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-[880px] pt-6 pb-16 lg:w-[calc(100%-4rem)] lg:pt-12 lg:pb-24">{children}</div>
      </main>
    </div>
  );
}
