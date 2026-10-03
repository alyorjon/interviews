import { useCallback, useState } from "react";

import { writeString } from "../lib/storage";

export type Theme = "light" | "dark";

/**
 * The initial theme is applied before paint by /theme-init.js (saved choice,
 * then Telegram's scheme, then the OS preference); this hook only toggles it.
 */
export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#141413" : "#f6f5f1");
    writeString("theme", next);
    setTheme(next);
  }, [theme]);
  return { theme, toggleTheme };
}
