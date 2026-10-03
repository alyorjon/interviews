// Runs before first paint (loaded synchronously in <head>) so dark mode never
// flashes white. Kept as a file, not inline, so the CSP needs no 'unsafe-inline'.
(function () {
  var theme;
  try { theme = localStorage.getItem("theme"); } catch (_) {}
  if (theme !== "light" && theme !== "dark") {
    // telegram-web-app.js reports "light" even outside Telegram, so trust it only in a real session.
    var app = window.Telegram && window.Telegram.WebApp;
    var telegram = app && app.initData ? app.colorScheme : undefined;
    theme = telegram || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  document.documentElement.dataset.theme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#141413" : "#f6f5f1");
})();
