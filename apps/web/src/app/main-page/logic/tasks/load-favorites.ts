import { fetchFavorites } from '~/api/favorites';
import { useFavoritesStore } from '~/app/main-page/stores/favorites.store';
import { useSessionStore } from '~/app/stores/session.store';

const getUserEmail = () => useSessionStore.getState().user?.email ?? null;

export const loadFavorites = async (): Promise<void> => {
  const store = useFavoritesStore.getState();
  if (store.status === 'loading') return;

  const email = getUserEmail();
  store.startLoading();

  try {
    const shows = await fetchFavorites();
    if (getUserEmail() === email) useFavoritesStore.getState().receiveFavorites(shows);
  } catch {
    if (getUserEmail() === email) useFavoritesStore.getState().failLoading();
  }
};
