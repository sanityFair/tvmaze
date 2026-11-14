import type { Show } from '@tvmaze/contracts';

import { addFavorite, removeFavorite } from '~/api/favorites';
import { useFavoritesStore } from '~/app/logic/favorites.store';

const pendingShowIds = new Set<number>();

export type FavoriteChange = 'added' | 'removed';

export const toggleFavorite = async (show: Show): Promise<FavoriteChange | null> => {
  if (pendingShowIds.has(show.id)) return null;
  pendingShowIds.add(show.id);

  const store = useFavoritesStore.getState();
  const wasFavorite = store.shows.some(({ id }) => id === show.id);

  if (wasFavorite) store.removeShow(show.id);
  else store.addShow(show);

  try {
    await (wasFavorite ? removeFavorite(show.id) : addFavorite(show.id));
    return wasFavorite ? 'removed' : 'added';
  } catch {
    const rollback = useFavoritesStore.getState();
    if (wasFavorite) rollback.addShow(show);
    else rollback.removeShow(show.id);
    return null;
  } finally {
    pendingShowIds.delete(show.id);
  }
};
