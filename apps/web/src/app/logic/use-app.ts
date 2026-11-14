import { useEffect } from 'react';

import { useFavoritesStore } from '~/stores/favorites.store';
import { loadFavorites } from '~/tasks/load-favorites';

export const useApp = () => {
  const favoritesCount = useFavoritesStore((state) => state.shows.length);

  useEffect(() => {
    void loadFavorites();
  }, []);

  return {
    favoritesLabel: favoritesCount > 0 ? `Favorites (${favoritesCount})` : 'Favorites',
  };
};
