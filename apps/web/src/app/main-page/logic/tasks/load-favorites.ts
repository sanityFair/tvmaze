import { fetchFavorites } from '~/api/favorites';
import { useSessionStore } from '~/stores/session.store';

import { useFavoritesStore } from '../../stores/favorites.store';

const getUserEmail = () => useSessionStore.getState().user?.email ?? null;

export const loadFavorites = async (): Promise<void> => {
  const favorites = useFavoritesStore.getState();
  if (favorites.status === 'loading') return;

  const requestedFor = getUserEmail();
  favorites.setStatus({ status: 'loading' });

  try {
    const shows = await fetchFavorites();
    const isSameUser = getUserEmail() === requestedFor;
    if (!isSameUser) return;

    favorites.setShows({ shows });
    favorites.setStatus({ status: 'ready' });
  } catch {
    const isSameUser = getUserEmail() === requestedFor;
    if (isSameUser) favorites.setStatus({ status: 'error' });
  }
};
