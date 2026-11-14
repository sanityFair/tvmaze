import { useShowSearchStore } from '../show-search.store';
import { loadShows } from './load-shows';

/** Opens another page of the loaded search results, keeping the genre filter. */
export const goToPage = async (page: number): Promise<void> => {
  const { loadedQuery, response } = useShowSearchStore.getState();
  if (loadedQuery === null || response === null) return;

  await loadShows({ query: loadedQuery, genre: response.genre, page });
};
