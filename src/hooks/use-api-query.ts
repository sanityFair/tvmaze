import { useEffect, useRef, useState } from 'react';

import { apiGet, toQueryString, type QueryParams } from '@/api/http-client';

export type QueryOptions = {
  path: string;
  params?: QueryParams;
  enabled?: boolean;
};

export type QueryState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

const IDLE_STATE: QueryState<never> = { data: null, isLoading: false, error: null };

const toError = (reason: unknown): Error =>
  reason instanceof Error ? reason : new Error(String(reason));

export const useApiQuery = <T>({ path, params, enabled = true }: QueryOptions): QueryState<T> => {
  const [state, setState] = useState<QueryState<T>>(IDLE_STATE);
  const loadedKeyRef = useRef<string | null>(null);
  const query = toQueryString(params);

  if (!enabled && state !== IDLE_STATE) {
    setState(IDLE_STATE);
  }

  useEffect(() => {
    if (!enabled) {
      loadedKeyRef.current = null;
      return;
    }

    const key = `${path}?${query}`;

    if (key === loadedKeyRef.current) {
      setState((prev) =>
        prev.isLoading || prev.error ? { ...prev, isLoading: false, error: null } : prev,
      );
      return;
    }

    const controller = new AbortController();
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    apiGet<T>(path, query, controller.signal).then(
      (data) => {
        if (controller.signal.aborted) return;
        loadedKeyRef.current = key;
        setState({ data, isLoading: false, error: null });
      },
      (reason: unknown) => {
        if (controller.signal.aborted) return;
        setState((prev) => ({ ...prev, isLoading: false, error: toError(reason) }));
      },
    );

    return () => controller.abort();
  }, [enabled, path, query]);

  return state;
};
