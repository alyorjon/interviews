/*
 * Shared Tailwind class sets for patterns used in several components. Colours
 * come only from the theme tokens in styles.css (bg-surface, text-muted, …).
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const buttonBase = "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4.5 text-sm font-semibold transition-colors disabled:opacity-45 [&_svg]:size-4";

export const button = {
  primary: `${buttonBase} border-transparent bg-accent text-on-accent not-disabled:hover:bg-accent-hover not-disabled:hover:text-on-accent`,
  secondary: `${buttonBase} border-line-strong bg-surface text-fg not-disabled:hover:bg-surface-muted not-disabled:hover:text-fg`,
};

export const panel = "rounded-2xl border border-line bg-surface";

export const eyebrow = "text-xs font-semibold uppercase tracking-wide text-accent";

/** Page-level H1 (CLAUDE.md heading scale: 28px, tight tracking). */
export const pageTitle = "text-2xl font-bold tracking-tight sm:text-[28px]";

/** Section H2 (19px). */
export const sectionTitle = "text-[19px] font-bold tracking-tight";
