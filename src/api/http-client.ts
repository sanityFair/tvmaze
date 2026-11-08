const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, statusText: string, url: URL) {
    super(`GET ${url.pathname} failed with ${status}${statusText ? ` ${statusText}` : ''}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

export function toQueryString(params: QueryParams = {}): string {
  const searchParams = new URLSearchParams();

  for (const key of Object.keys(params).sort()) {
    const value = params[key];
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
}

export async function apiGet<T>(path: string, query: string, signal?: AbortSignal): Promise<T> {
  const url = new URL(path, BASE_URL);
  url.search = query;

  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText, url);
  }

  return (await response.json()) as T;
}
