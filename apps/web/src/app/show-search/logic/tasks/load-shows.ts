import { fetchShowsPage } from '~/api/shows';

import { useShowSearchStore } from '../show-search.store';

const PAGE_SIZE = 3;

let activeRequest: AbortController | null = null;

const toError = (reason: unknown): Error =>
  reason instanceof Error ? reason : new Error(String(reason));

export const loadShows = async (): Promise<void> => {
  activeRequest?.abort();
  activeRequest = null;

  const { query, genre, page, startLoading } = useShowSearchStore.getState();
  if (query === '') return;

  const request = new AbortController();
  activeRequest = request;
  startLoading();

  try {
    const response = await fetchShowsPage(
      { q: query, genre: genre ?? undefined, page, pageSize: PAGE_SIZE },
      request.signal,
    );
    if (request.signal.aborted) return;
    useShowSearchStore.getState().receiveResults(response);
  } catch (reason) {
    if (request.signal.aborted) return;
    useShowSearchStore.getState().failLoading(toError(reason));
  } finally {
    if (activeRequest === request) activeRequest = null;
  }
};
