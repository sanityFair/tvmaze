const CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry = {
  data: unknown;
  expiresAt: number;
};

/** In-memory cache of TVMaze responses keyed by request path + query. */
const cache: Record<string, CacheEntry> = {};

export const readCache = <T>(key: string): T | undefined => {
  const entry = cache[key];
  if (!entry) return undefined;

  if (entry.expiresAt <= Date.now()) {
    delete cache[key];
    return undefined;
  }

  return entry.data as T;
};

export const writeCache = (key: string, data: unknown): void => {
  cache[key] = { data, expiresAt: Date.now() + CACHE_TTL_MS };
};
