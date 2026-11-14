import { fetchShowsPage } from '~/api/shows';

import { useShowSearchStore } from '../show-search.store';

const PAGE_SIZE = 3;

export type ShowsRequest = {
  query: string;
  genre: string | null;
  page: number;
};

let activeRequest: AbortController | null = null;

const toError = (reason: unknown): Error =>
  reason instanceof Error ? reason : new Error(String(reason));

export const cancelShowsRequest = (): void => {
  activeRequest?.abort();
  activeRequest = null;
};

/** Loads one page of search results; a newer request cancels the previous one. */
export const loadShows = async ({ query, genre, page }: ShowsRequest): Promise<void> => {
  cancelShowsRequest();

  const request = new AbortController();
  activeRequest = request;
  useShowSearchStore.getState().startSearch(query);

  try {
    const response = await fetchShowsPage(
      { q: query, genre: genre ?? undefined, page, pageSize: PAGE_SIZE },
      request.signal,
    );
    if (request.signal.aborted) return;
    useShowSearchStore.getState().receiveResults(query, response);
  } catch (reason) {
    if (request.signal.aborted) return;
    useShowSearchStore.getState().failSearch(toError(reason));
  } finally {
    if (activeRequest === request) activeRequest = null;
  }
};
