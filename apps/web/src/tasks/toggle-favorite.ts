import type { Show } from '@tvmaze/contracts';

import { addFavorite, removeFavorite } from '~/api/favorites';
import { useFavoritesStore } from '~/stores/favorites.store';

/** Shows with a request in flight; repeated toggles are ignored until it settles. */
const pendingShowIds = new Set<number>();

/**
 * Adds the show to favorites or removes it. The store is updated optimistically
 * and rolled back if the server rejects the change.
 */
export const toggleFavorite = async (show: Show): Promise<void> => {
  if (pendingShowIds.has(show.id)) return;
  pendingShowIds.add(show.id);

  const store = useFavoritesStore.getState();
  const wasFavorite = store.shows.some(({ id }) => id === show.id);

  if (wasFavorite) store.removeShow(show.id);
  else store.addShow(show);

  try {
    await (wasFavorite ? removeFavorite(show.id) : addFavorite(show.id));
  } catch {
    const rollback = useFavoritesStore.getState();
    if (wasFavorite) rollback.addShow(show);
    else rollback.removeShow(show.id);
  } finally {
    pendingShowIds.delete(show.id);
  }
};
