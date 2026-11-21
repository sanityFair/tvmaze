import { useEffect } from 'react';

import { loadFavorites } from '~/app/logic/tasks/load-favorites';
import { useFavoritesRoute } from '~/app/logic/use-favorites-route';
import { selectFavoritesCount, useFavoritesStore } from '~/app/stores/favorites.store';

const pluralRules = new Intl.PluralRules('en-US');

export const useMainLayout = () => {
  const favoritesRoute = useFavoritesRoute();
  const favoritesCount = useFavoritesStore(selectFavoritesCount);

  useEffect(() => {
    void loadFavorites();
  }, []);

  return {
    isFavoritesOpen: favoritesRoute.isOpen,
    onFavoritesOpenChange: (open: boolean) =>
      open ? favoritesRoute.open() : favoritesRoute.close(),
    favoritesCount,
    favoritesLabel: `Favorites, ${favoritesCount} ${pluralRules.select(favoritesCount) === 'one' ? 'show' : 'shows'}`,
  };
};
