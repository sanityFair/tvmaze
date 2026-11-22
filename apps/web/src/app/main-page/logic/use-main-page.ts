import { useEffect } from 'react';

import { selectSessionStatus, useSessionStore } from '~/stores/session.store';

import { useFavoritesStore } from '../stores/favorites.store';
import { loadFavorites } from './tasks/load-favorites';
import { useFavoritesRoute } from './use-favorites-route';

export const useMainPage = () => {
  const favoritesRoute = useFavoritesRoute();
  const sessionStatus = useSessionStore(selectSessionStatus);
  const resetFavorites = useFavoritesStore((state) => state.reset);

  useEffect(() => {
    if (sessionStatus === 'authenticated') loadFavorites();
    if (sessionStatus === 'anonymous') resetFavorites();
  }, [sessionStatus, resetFavorites]);

  return {
    isFavoritesOpen: favoritesRoute.isOpen,
    onFavoritesOpenChange: (open: boolean) =>
      open ? favoritesRoute.open() : favoritesRoute.close(),
    onCloseFavorites: favoritesRoute.close,
    onRetryFavorites: () => loadFavorites(),
  };
};
