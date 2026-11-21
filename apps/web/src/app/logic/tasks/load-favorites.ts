import { fetchFavorites } from '~/api/favorites';
import { useFavoritesStore } from '~/app/stores/favorites.store';
import { useSessionStore } from '~/app/stores/session.store';

const getUserEmail = () => useSessionStore.getState().user?.email ?? null;

export const loadFavorites = async (): Promise<void> => {
  const store = useFavoritesStore.getState();
  if (store.status === 'loading') return;

  const email = getUserEmail();
  store.startLoading();

  try {
    const shows = await fetchFavorites();
    // Drop a response that arrived after the user signed out or switched accounts.
    if (getUserEmail() === email) useFavoritesStore.getState().receiveFavorites(shows);
  } catch {
    if (getUserEmail() === email) useFavoritesStore.getState().failLoading();
  }
};
