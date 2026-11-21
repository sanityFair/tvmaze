import type { ShowsPage } from '@tvmaze/contracts';

import { HttpError } from '~/api/http-client';
import { fetchShowsPage } from '~/api/shows';

const PAGE_SIZE = 3;

export type SearchCriteria = {
  q: string;
  genre: string | null;
  page: number;
};

export type SearchFailure =
  | { reason: 'offline' | 'rate-limited' | 'unavailable' | 'server-error' }
  | { reason: 'rejected'; message: string };

export type SearchShowsResult =
  | { status: 'loaded'; results: ShowsPage }
  | { status: 'failed'; failure: SearchFailure }
  | { status: 'cancelled' };

const toFailure = (reason: unknown): SearchFailure => {
  if (!(reason instanceof HttpError)) return { reason: 'offline' };
  if (reason.status === 429) return { reason: 'rate-limited' };
  if (reason.status === 502) return { reason: 'unavailable' };
  if (reason.status >= 500) return { reason: 'server-error' };
  return { reason: 'rejected', message: reason.message };
};

export const searchShows = async (
  { q, genre, page }: SearchCriteria,
  signal: AbortSignal,
): Promise<SearchShowsResult> => {
  try {
    const results = await fetchShowsPage(
      { q, genre: genre ?? undefined, page, pageSize: PAGE_SIZE },
      signal,
    );
    return signal.aborted ? { status: 'cancelled' } : { status: 'loaded', results };
  } catch (reason) {
    return signal.aborted
      ? { status: 'cancelled' }
      : { status: 'failed', failure: toFailure(reason) };
  }
};
