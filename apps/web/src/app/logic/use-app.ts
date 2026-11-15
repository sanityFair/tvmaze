import { useEffect } from 'react';

import { loadFavorites } from '~/app/logic/tasks/load-favorites';
import { selectFavoritesCount, useFavoritesStore } from '~/app/stores/favorites.store';

import { useFavoritesRoute } from './use-favorites-route';

const pluralRules = new Intl.PluralRules('en-US');

export const useApp = () => {
  const favoritesRoute = useFavoritesRoute();
  const favoritesCount = useFavoritesStore(selectFavoritesCount);

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    isFavoritesOpen: favoritesRoute.isOpen,
    onFavoritesOpenChange: (open: boolean) =>
      open ? favoritesRoute.open() : favoritesRoute.close(),
    onCloseFavorites: favoritesRoute.close,
    favoritesCount,
    favoritesLabel: `Favorites, ${favoritesCount} ${pluralRules.select(favoritesCount) === 'one' ? 'show' : 'shows'}`,
  };
};
