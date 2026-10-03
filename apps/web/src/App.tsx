import { lazy, Suspense, useEffect } from "react";

import { Layout } from "./components/Layout";
import { StatePanel } from "./components/StatePanel";
import { useAsync } from "./hooks/useAsync";
import { useProgress } from "./hooks/useProgress";
import { useRoute } from "./hooks/useRoute";
import { useTheme } from "./hooks/useTheme";
import { loadManifest } from "./lib/content";
import { navigate } from "./lib/route";
import { signalTelegramReady, telegramBackButton } from "./lib/telegram";
import { Dashboard } from "./pages/Dashboard";

// The dashboard is the landing view; the heavier views load on demand.
const PageView = lazy(() => import("./pages/PageView").then((module) => ({ default: module.PageView })));
const Review = lazy(() => import("./pages/Review").then((module) => ({ default: module.Review })));

/** Mirrors in-app navigation onto Telegram's native back button. */
function useTelegramBackButton(visible: boolean) {
  useEffect(() => {
    const button = telegramBackButton();
    if (!button) return;
    const back = () => navigate({ name: "dashboard" });
    if (visible) {
      button.onClick(back);
      button.show();
    } else {
      button.hide();
    }
    return () => button.offClick(back);
  }, [visible]);
}

export default function App() {
  const route = useRoute();
  const { theme, toggleTheme } = useTheme();
  const { scores, rate, status: sync } = useProgress();
  const manifest = useAsync("manifest", () => loadManifest());

  useEffect(signalTelegramReady, []);
  useTelegramBackButton(route.name !== "dashboard");

  const total = manifest.status === "ready" ? manifest.data.cardCount : 0;

  return (
    <Layout route={route} theme={theme} onToggleTheme={toggleTheme} rated={Object.keys(scores).length} total={total} sync={sync}>
      {manifest.status === "loading" && <StatePanel kind="loading" />}
      {manifest.status === "error" && <StatePanel kind="error" onRetry={manifest.retry} />}
      {manifest.status === "ready" && (
        <Suspense fallback={<StatePanel kind="loading" />}>
          {route.name === "dashboard" && <Dashboard manifest={manifest.data} scores={scores} />}
          {route.name === "page" && <PageView slug={route.slug} manifest={manifest.data} scores={scores} onRate={rate} />}
          {route.name === "review" && <Review topic={route.topic} manifest={manifest.data} scores={scores} onRate={rate} />}
        </Suspense>
      )}
    </Layout>
  );
}
