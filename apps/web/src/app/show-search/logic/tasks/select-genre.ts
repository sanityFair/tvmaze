import { useShowSearchStore } from '../show-search.store';
import { loadShows } from './load-shows';

/** Filters the loaded search results by genre, starting from the first page. */
export const selectGenre = async (genre: string | null): Promise<void> => {
  const { loadedQuery } = useShowSearchStore.getState();
  if (loadedQuery === null) return;

  await loadShows({ query: loadedQuery, genre, page: 1 });
};
