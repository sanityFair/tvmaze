const CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry = {
  data: unknown;
  storedAt: number;
};

const cache: Record<string, CacheEntry> = {};

const isExpired = (entry: CacheEntry): boolean => Date.now() - entry.storedAt >= CACHE_TTL_MS;

export const readCache = <T>(key: string): T | undefined => {
  const entry = cache[key];
  if (!entry) return undefined;

  if (isExpired(entry)) {
    delete cache[key];
    return undefined;
  }

  return entry.data as T;
};

export const writeCache = (key: string, data: unknown): void => {
  cache[key] = { data, storedAt: Date.now() };
};
