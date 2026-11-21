import type { Show } from '@tvmaze/contracts';

import { addFavorite, removeFavorite } from '~/api/favorites';
import { HttpError } from '~/api/http-client';
import { useFavoritesStore } from '~/app/stores/favorites.store';
import { useSessionStore } from '~/app/stores/session.store';

const pendingShowIds = new Set<number>();

export type FavoriteChange = 'added' | 'removed';

/** `sign-in-required` — favorites are personal, so a guest has to sign in first. */
export type ToggleFavoriteResult = FavoriteChange | 'sign-in-required' | null;

export const toggleFavorite = async (show: Show): Promise<ToggleFavoriteResult> => {
  if (useSessionStore.getState().status !== 'authenticated') return 'sign-in-required';
  if (pendingShowIds.has(show.id)) return null;
  pendingShowIds.add(show.id);

  const store = useFavoritesStore.getState();
  const wasFavorite = store.shows.some(({ id }) => id === show.id);

  if (wasFavorite) store.removeShow(show.id);
  else store.addShow(show);

  try {
    await (wasFavorite ? removeFavorite(show.id) : addFavorite(show.id));
    return wasFavorite ? 'removed' : 'added';
  } catch (reason) {
    const rollback = useFavoritesStore.getState();
    if (wasFavorite) rollback.addShow(show);
    else rollback.removeShow(show.id);
    return reason instanceof HttpError && reason.status === 401 ? 'sign-in-required' : null;
  } finally {
    pendingShowIds.delete(show.id);
  }
};
