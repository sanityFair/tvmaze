import { fetchShows } from '~/api/tvmaze';

import { useShowSearchStore } from '../show-search.store';

let activeRequest: AbortController | null = null;

const toError = (reason: unknown): Error =>
  reason instanceof Error ? reason : new Error(String(reason));

export const searchShows = async (query: string): Promise<void> => {
  activeRequest?.abort();
  activeRequest = null;

  const store = useShowSearchStore.getState();

  if (query === '') {
    store.resetSearch();
    return;
  }

  if (query === store.loadedQuery) {
    store.restoreLoaded();
    return;
  }

  const request = new AbortController();
  activeRequest = request;
  store.startSearch(query);

  try {
    const results = await fetchShows(query, request.signal);
    if (request.signal.aborted) return;
    useShowSearchStore.getState().receiveResults(query, results);
  } catch (reason) {
    if (request.signal.aborted) return;
    useShowSearchStore.getState().failSearch(toError(reason));
  } finally {
    if (activeRequest === request) activeRequest = null;
  }
};
