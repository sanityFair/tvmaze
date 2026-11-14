import { useEffect } from 'react';

import { useShowSearchStore } from './show-search.store';
import { loadShows } from './tasks/load-shows';

export const useShowSearch = () => {
  const query = useShowSearchStore((state) => state.query);
  const genre = useShowSearchStore((state) => state.genre);
  const page = useShowSearchStore((state) => state.page);

  useEffect(() => {
    loadShows();
  }, [query, genre, page]);
};
