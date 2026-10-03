import { useCallback, useEffect, useState } from "react";

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; error: unknown }
  | { status: "ready"; data: T };

/**
 * Runs `load` whenever `key` changes. A result that arrives after the key has
 * changed (fast navigation) is discarded instead of overwriting newer data.
 */
export function useAsync<T>(key: string, load: () => Promise<T>): AsyncState<T> & { retry: () => void } {
  const [state, setState] = useState<AsyncState<T> & { key: string }>({ status: "loading", key });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let current = true;
    setState({ status: "loading", key });
    load().then(
      (data) => { if (current) setState({ status: "ready", data, key }); },
      (error: unknown) => { if (current) setState({ status: "error", error, key }); },
    );
    return () => { current = false; };
    // `load` is intentionally keyed by `key`; callers pass inline closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  // Never expose data that belongs to a previous key during the render before the effect runs.
  const visible: AsyncState<T> = state.key === key ? state : { status: "loading" };
  return { ...visible, retry };
}
