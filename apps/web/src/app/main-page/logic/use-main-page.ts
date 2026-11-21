import { useEffect } from 'react';

import { loadFavorites } from '~/app/main-page/logic/tasks/load-favorites';
import { useFavoritesStore } from '~/app/main-page/stores/favorites.store';
import { selectSessionStatus, useSessionStore } from '~/app/stores/session.store';

export const useMainPage = () => {
  const sessionStatus = useSessionStore(selectSessionStatus);
  const resetFavorites = useFavoritesStore((state) => state.reset);

  useEffect(() => {
    if (sessionStatus === 'authenticated') loadFavorites();
    if (sessionStatus === 'anonymous') resetFavorites();
  }, [sessionStatus, resetFavorites]);
};
