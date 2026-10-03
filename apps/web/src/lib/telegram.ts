interface TelegramBackButton {
  show(): void;
  hide(): void;
  onClick(callback: () => void): void;
  offClick(callback: () => void): void;
}

interface TelegramWebApp {
  initData?: string;
  isVersionAtLeast?: (version: string) => boolean;
  colorScheme?: "light" | "dark";
  ready?: () => void;
  expand?: () => void;
  BackButton?: TelegramBackButton;
}

export function telegramWebApp(): TelegramWebApp | undefined {
  return (window as typeof window & { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
}

/** Signed launch parameters; empty outside Telegram. */
export function telegramInitData(): string {
  return telegramWebApp()?.initData ?? "";
}

export function signalTelegramReady(): void {
  const app = telegramWebApp();
  try {
    app?.ready?.();
    app?.expand?.();
  } catch {
    // Older Telegram clients may not implement every method.
  }
}

/** BackButton exists only inside Telegram clients that implement Bot API 6.1+. */
export function telegramBackButton(): TelegramBackButton | undefined {
  const app = telegramWebApp();
  if (!app?.initData || !app.isVersionAtLeast?.("6.1")) return undefined;
  return app.BackButton;
}
