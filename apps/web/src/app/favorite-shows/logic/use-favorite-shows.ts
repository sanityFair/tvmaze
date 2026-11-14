import { useFavoritesStore } from '~/stores/favorites.store';
import { loadFavorites } from '~/tasks/load-favorites';

export type FavoriteShowsStatus = 'loading' | 'error' | 'empty' | 'list';

export const useFavoriteShows = () => {
  const shows = useFavoritesStore((state) => state.shows);
  const loadStatus = useFavoritesStore((state) => state.status);

  const getStatus = (): FavoriteShowsStatus => {
    if (loadStatus === 'idle' || loadStatus === 'loading') return 'loading';
    if (loadStatus === 'error') return 'error';
    return shows.length === 0 ? 'empty' : 'list';
  };

  return {
    status: getStatus(),
    shows,
    onRetry: () => void loadFavorites(),
  };
};
