import { useEffect, useState } from 'react';

import { useFavoritesStore } from '~/app/logic/favorites.store';
import { loadFavorites } from '~/app/logic/tasks/load-favorites';

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
