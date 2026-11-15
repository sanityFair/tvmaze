import { useEffect } from 'react';

import {
  selectPage,
  selectGenre,
  selectQuery,
  useShowSearchStore,
} from '../stores/show-search.store';
import { loadShows } from './tasks/load-shows';

export const useShowSearch = () => {
  const query = useShowSearchStore(selectQuery);
  const genre = useShowSearchStore(selectGenre);
  const page = useShowSearchStore(selectPage);

  useEffect(() => {
    loadShows();
  }, [query, genre, page]);
};
