import { useEffect, useState } from 'react';

import { loadFavorites } from '~/app/logic/tasks/load-favorites';
import { useFavoritesStore } from '~/app/stores/favorites.store';

const pluralRules = new Intl.PluralRules('en-US');

export const useApp = () => {
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);
  const favoritesCount = useFavoritesStore((state) => state.shows.length);

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    isFavoritesOpen,
    onFavoritesOpenChange: setFavoritesOpen,
    favoritesCount,
    favoritesLabel: `Favorites, ${favoritesCount} ${pluralRules.select(favoritesCount) === 'one' ? 'show' : 'shows'}`,
  };
};
