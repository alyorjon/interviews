# Project rules

## UI / theming (index.html)

- `index.html` must always support both light and dark themes via CSS variables
  under `:root` and `:root[data-theme="dark"]`. Never hardcode colors in new
  styles — always reference a `var(--...)` token so both themes stay correct.
- Dark mode is the eye-strain fix the user asked for (bright white background
  was tiring). Keep the `#theme-toggle` button, the `toggleTheme()` JS
  function, and the `localStorage`-backed theme persistence working — do not
  remove or regress them when editing the page.
- The initial theme is chosen before paint (inline `<script>` in `<head>`) to
  avoid a white flash: `localStorage.theme` if set, else
  `prefers-color-scheme: dark`. Keep this logic in the `<head>`, not deferred
  to `DOMContentLoaded`.
- highlight.js code-block theme must swap alongside the page theme (github.min.css
  for light, github-dark.min.css for dark) via the `#hljs-theme` `<link>` tag.

## Typography (index.html)

- Base body font is 15px / line-height 1.7 (Inter), with `-webkit-font-smoothing:
  antialiased` for crisper rendering on all backgrounds — this was tuned for
  reading comfort, don't shrink it back down without a reason.
- Heading scale: `#content h1` 28px / h2 19px / h3 16px, all with small negative
  `letter-spacing` for a tighter, more polished title look. Keep this ratio
  when adding new heading levels or pages.
- Sidebar app title (`.sidebar-title`) is 16px/700 — treat it as the page's
  primary "title" and keep it visually dominant over nav items (13px) and the
  subtitle (12px).
