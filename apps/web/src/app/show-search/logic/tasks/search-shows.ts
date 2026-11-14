import { useShowSearchStore } from '../show-search.store';
import { cancelShowsRequest, loadShows } from './load-shows';

/** Starts a new search: resets the genre filter and returns to the first page. */
export const searchShows = async (query: string): Promise<void> => {
  const store = useShowSearchStore.getState();

  if (query === '') {
    cancelShowsRequest();
    store.resetSearch();
    return;
  }

  if (query === store.loadedQuery) {
    cancelShowsRequest();
    store.restoreLoaded();
    return;
  }

  await loadShows({ query, genre: null, page: 1 });
};
