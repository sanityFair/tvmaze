import { useEffect } from 'react';

import { selectGenre, selectQuery, useShowSearchStore } from '../stores/show-search.store';
import { loadShows } from './tasks/load-shows';

/** Reloads results when the search criteria change; page changes go through `goToPage`. */
export const useShowSearch = () => {
  const query = useShowSearchStore(selectQuery);
  const genre = useShowSearchStore(selectGenre);

  useEffect(() => {
    void loadShows();
  }, [query, genre]);
};
