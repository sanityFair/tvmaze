import type { ApiErrorBody } from '@tvmaze/contracts';

const API_PREFIX = '/api';

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestOptions = {
  method?: 'GET' | 'PUT' | 'DELETE';
  query?: QueryParams;
  signal?: AbortSignal;
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
  const { method = 'GET', query, signal } = options;
  const search = toQueryString(query);
  const url = `${API_PREFIX}${path}${search ? `?${search}` : ''}`;

  const response = await fetch(url, { method, signal, headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new HttpError(response.status, await readErrorMessage(response));
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
};
