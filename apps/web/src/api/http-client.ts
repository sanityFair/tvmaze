import type { ApiErrorBody } from '@tvmaze/contracts';

const API_PREFIX = '/api';

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query?: QueryParams;
  body?: unknown;
  signal?: AbortSignal;
};

let unauthorizedListener: (() => void) | null = null;

/** Called whenever the API answers 401, i.e. the session cookie is missing or expired. */
export const onUnauthorized = (listener: () => void): (() => void) => {
  unauthorizedListener = listener;
  return () => {
    if (unauthorizedListener === listener) unauthorizedListener = null;
  };
};

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export const toQueryString = (params: QueryParams = {}): string => {
  const searchParams = new URLSearchParams();

  for (const key of Object.keys(params).sort()) {
    const value = params[key];
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};

const readErrorMessage = async (response: Response): Promise<string> => {
  const body = (await response.json().catch(() => null)) as Partial<ApiErrorBody> | null;
  if (typeof body?.message === 'string') return body.message;
  return `Request failed with ${response.status} ${response.statusText}`.trim();
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', query, body, signal } = options;
  const search = toQueryString(query);
  const url = `${API_PREFIX}${path}${search ? `?${search}` : ''}`;

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const response = await fetch(url, {
    method,
    signal,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 401) unauthorizedListener?.();
    throw new HttpError(response.status, await readErrorMessage(response));
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
};
