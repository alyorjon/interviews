# Project rules

The portal UI lives in `apps/web` (React 19 + Vite + TypeScript + Tailwind CSS v4).
The old single-file root `index.html` viewer and `scripts/build_index.py` were removed;
do not recreate them. Learning content is Markdown; `npm run content:audit` turns it into
static JSON shards in `apps/web/public/data` (generated, git-ignored).

## UI / theming (apps/web)

- Styling is Tailwind utilities in JSX. Shared class sets live in `src/lib/ui.ts`;
  don't add hand-written CSS files or `@apply` blocks for component styling.
- Every colour is a CSS variable defined in `src/styles.css` under `:root` (light) and
  `:root[data-theme="dark"]` (dark), exposed to Tailwind via `@theme inline`
  (`bg-surface`, `text-muted`, `border-line`, …). Never use raw hex or Tailwind palette
  colours (`bg-white`, `text-gray-500`) in components — both themes must stay correct.
- Dark mode is the eye-strain fix the user asked for. Keep the `#theme-toggle` button,
  `useTheme()` and the `localStorage.theme` persistence working.
- The initial theme is chosen before paint by `public/theme-init.js` (loaded
  synchronously in `<head>`, not inline, so the CSP needs no `'unsafe-inline'`):
  saved choice → Telegram `colorScheme` (only inside a real Telegram session) →
  `prefers-color-scheme`.
- Show each piece of information once. Cards must not repeat the question, the answer,
  or internal audit scores; a page shows questions and the full article on separate tabs.
- Grids that contain long text or code need `grid-cols-1`/`min-w-0`, otherwise they
  overflow at 360px. Check 360px and desktop, light and dark, zero console errors.

## Typography (apps/web)

- Base body font is 15px / line-height 1.7 (Inter), with `-webkit-font-smoothing:
  antialiased` — tuned for reading comfort, don't shrink it without a reason.
- Heading scale: page H1 28px (`pageTitle` in `src/lib/ui.ts`), H2 19px, H3 16px, all
  with slight negative tracking. Keep this ratio when adding headings.
- Sidebar app title (`.sidebar-title`) is 16px/700 — visually dominant over nav items
  (13px) and the subtitle (12px).

## Content

- Questions are `## QN. Uzbek question? / English question?` headings; put news or theory
  sections before the first question (anything between questions becomes part of the
  previous answer).
- Never generate placeholder/filler questions; a regression test fails when 5+ questions
  differ only by a number. Verify facts and version dates against primary sources and run
  code samples before adding them.

## Architecture

- Content is public and CDN-cacheable; the API only stores per-user progress
  (`/api/me/progress`, Redis) behind Telegram `initData` verification. Keep the API
  stateless; singletons (bot polling) must not run on more than one replica — use
  `BOT_MODE=webhook` for multiple replicas. See `docs/operations/scaling.md`.
