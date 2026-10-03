import { useCallback, useEffect, useRef, useState } from "react";

import {
  fetchServerScores, isScore, MAX_BATCH, PENDING_KEY, PROGRESS_KEY, ProgressAccessError, ProgressRejectedError, pushScores,
  readScores, type Scores, writeScores,
} from "../lib/progress";
import { telegramInitData } from "../lib/telegram";

/**
 * - `local`: no Telegram session; progress stays in this browser.
 * - `synced` / `syncing`: server copy is (being) updated.
 * - `offline`: changes are queued and retried.
 * - `denied`: Telegram session rejected; progress stays local.
 */
export type SyncStatus = "local" | "syncing" | "synced" | "offline" | "denied";

/** Batches rapid ratings into one request: the main write-load lever at scale. */
const FLUSH_DELAY_MS = 3_000;
const RETRY_DELAY_MS = 30_000;

export function useProgress() {
  const [scores, setScores] = useState<Scores>(() => readScores(PROGRESS_KEY));
  const [status, setStatus] = useState<SyncStatus>(() => telegramInitData() ? "syncing" : "local");
  const pending = useRef<Scores>(readScores(PENDING_KEY));
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inFlight = useRef(false);
  const enabled = useRef(Boolean(telegramInitData()));
  const pulled = useRef(false);
  const pulling = useRef(false);
  const pullTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const deny = useCallback(() => {
    enabled.current = false;
    clearTimeout(timer.current);
    clearTimeout(pullTimer.current);
    setStatus("denied");
  }, []);

  const flush = useCallback(async (keepalive = false): Promise<void> => {
    clearTimeout(timer.current);
    const initData = telegramInitData();
    const batch = Object.fromEntries(Object.entries(pending.current).slice(0, MAX_BATCH));
    if (!enabled.current || !initData || inFlight.current || !Object.keys(batch).length) return;
    inFlight.current = true;
    setStatus("syncing");
    const settle = () => {
      for (const [id, score] of Object.entries(batch)) {
        // Keep entries that were re-rated while the request was in flight.
        if (pending.current[id] === score) delete pending.current[id];
      }
      writeScores(PENDING_KEY, pending.current);
    };
    try {
      await pushScores(initData, batch, keepalive);
      settle();
      setStatus("synced");
      if (Object.keys(pending.current).length) timer.current = setTimeout(() => void flush(), 0);
    } catch (error) {
      if (error instanceof ProgressAccessError) {
        deny();
      } else if (error instanceof ProgressRejectedError) {
        // The server will never accept this batch (e.g. ids from a retired
        // catalog). Retrying would loop forever; the scores stay local.
        settle();
        setStatus("synced");
        if (Object.keys(pending.current).length) timer.current = setTimeout(() => void flush(), 0);
      } else {
        setStatus("offline");
        timer.current = setTimeout(() => void flush(), RETRY_DELAY_MS);
      }
    } finally {
      inFlight.current = false;
    }
  }, [deny]);

  // Reconciliation: union of server and local; local wins on conflict because it
  // is the most recent action on this device. Retried until it succeeds once.
  const pull = useCallback(async (): Promise<void> => {
    const initData = telegramInitData();
    if (!enabled.current || !initData || pulled.current || pulling.current) return;
    pulling.current = true;
    clearTimeout(pullTimer.current);
    try {
      const server = await fetchServerScores(initData);
      if (pulled.current) return;
      pulled.current = true;
      const local = readScores(PROGRESS_KEY);
      for (const [id, score] of Object.entries(local)) if (server[id] !== score) pending.current[id] = score;
      writeScores(PENDING_KEY, pending.current);
      setScores((current) => ({ ...server, ...local, ...current }));
      setStatus("synced");
      await flush();
    } catch (error) {
      if (error instanceof ProgressAccessError) {
        deny();
      } else {
        setStatus("offline");
        pullTimer.current = setTimeout(() => void pull(), RETRY_DELAY_MS);
      }
    } finally {
      pulling.current = false;
    }
  }, [deny, flush]);

  useEffect(() => { void pull(); }, [pull]);

  useEffect(() => writeScores(PROGRESS_KEY, scores), [scores]);

  useEffect(() => {
    const flushNow = () => void flush(true);
    const onVisibility = () => { if (document.visibilityState === "hidden") flushNow(); };
    const onOnline = () => void (pulled.current ? flush() : pull());
    window.addEventListener("pagehide", flushNow);
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", flushNow);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(timer.current);
      clearTimeout(pullTimer.current);
    };
  }, [flush, pull]);

  const rate = useCallback((cardId: string, score: number) => {
    if (!isScore(score)) return;
    setScores((current) => ({ ...current, [cardId]: score }));
    if (!enabled.current) return;
    pending.current[cardId] = score;
    writeScores(PENDING_KEY, pending.current);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => void flush(), FLUSH_DELAY_MS);
  }, [flush]);

  return { scores, rate, status };
}
