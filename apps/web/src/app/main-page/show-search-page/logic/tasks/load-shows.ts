import { fetchShowsPage } from '~/api/shows';

import { useShowSearchStore } from '../../stores/show-search.store';

const PAGE_SIZE = 3;

/** `skipped` — nothing to load or the request was superseded by a newer one. */
export type LoadShowsResult = 'loaded' | 'failed' | 'skipped';

let activeRequest: AbortController | null = null;

const toError = (reason: unknown): Error =>
  reason instanceof Error ? reason : new Error(String(reason));

export const loadShows = async (): Promise<LoadShowsResult> => {
  activeRequest?.abort();
  activeRequest = null;

  const { query, genre, page, startLoading } = useShowSearchStore.getState();
  if (query === '') return 'skipped';

  const request = new AbortController();
  activeRequest = request;
  startLoading();

  try {
    const response = await fetchShowsPage(
      { q: query, genre: genre ?? undefined, page, pageSize: PAGE_SIZE },
      request.signal,
    );
    if (request.signal.aborted) return 'skipped';
    useShowSearchStore.getState().receiveResults(response);
    return 'loaded';
  } catch (reason) {
    if (request.signal.aborted) return 'skipped';
    useShowSearchStore.getState().failLoading(toError(reason));
    return 'failed';
  } finally {
    if (activeRequest === request) activeRequest = null;
  }
};
