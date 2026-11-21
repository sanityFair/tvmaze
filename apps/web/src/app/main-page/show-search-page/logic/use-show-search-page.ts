import { useEffect, useRef } from 'react';

import { selectGenre, selectQuery, useShowSearchStore } from '../stores/show-search.store';
import { loadShows } from './tasks/load-shows';

const toCriteriaKey = (query: string, genre: string | null) => JSON.stringify([query, genre]);

/** Reloads results when the search criteria change; page changes go through `goToPage`. */
export const useShowSearchPage = () => {
  const query = useShowSearchStore(selectQuery);
  const genre = useShowSearchStore(selectGenre);
  // Returning from another page keeps the results already in the store instead of refetching.
  const loadedKey = useRef(
    useShowSearchStore.getState().response ? toCriteriaKey(query, genre) : null,
  );

  useEffect(() => {
    const key = toCriteriaKey(query, genre);
    if (loadedKey.current === key) return;
    loadedKey.current = key;
    void loadShows();
  }, [query, genre]);
};
