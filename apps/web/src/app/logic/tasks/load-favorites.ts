import { fetchFavorites } from '~/api/favorites';
import { useFavoritesStore } from '~/app/logic/favorites.store';

export const loadFavorites = async (): Promise<void> => {
  const store = useFavoritesStore.getState();
  if (store.status === 'loading') return;

  store.startLoading();

  try {
    useFavoritesStore.getState().receiveFavorites(await fetchFavorites());
  } catch {
    useFavoritesStore.getState().failLoading();
  }
};
