import type { Show } from '@tvmaze/contracts';

import { addFavorite, removeFavorite } from '~/api/favorites';
import { hasHttpStatus } from '~/api/http-client';
import { useFavoritesStore } from '~/app/main-page/stores/favorites.store';
import { useSessionStore } from '~/stores/session.store';

export type FavoriteChange = 'added' | 'removed';

export type ToggleFavoriteResult = FavoriteChange | 'sign-in-required' | null;

const pendingShowIds = new Set<number>();

const withShow = (shows: Show[], show: Show): Show[] =>
  shows.some(({ id }) => id === show.id) ? shows : [show, ...shows];

const withoutShow = (shows: Show[], showId: number): Show[] =>
  shows.filter(({ id }) => id !== showId);

const markFavorite = (show: Show, isFavorite: boolean) => {
  const favorites = useFavoritesStore.getState();
  const shows = isFavorite
    ? withShow(favorites.shows, show)
    : withoutShow(favorites.shows, show.id);
  favorites.setShows({ shows });
};

export const toggleFavorite = async ({ show }: { show: Show }): Promise<ToggleFavoriteResult> => {
  const isSignedIn = useSessionStore.getState().status === 'authenticated';
  if (!isSignedIn) return 'sign-in-required';
  if (pendingShowIds.has(show.id)) return null;

  const wasFavorite = useFavoritesStore.getState().shows.some(({ id }) => id === show.id);
  pendingShowIds.add(show.id);
  markFavorite(show, !wasFavorite);

  try {
    if (wasFavorite) await removeFavorite({ showId: show.id });
    else await addFavorite({ showId: show.id });
    return wasFavorite ? 'removed' : 'added';
  } catch (reason) {
    markFavorite(show, wasFavorite);
    const isSessionExpired = hasHttpStatus(reason, 401);
    return isSessionExpired ? 'sign-in-required' : null;
  } finally {
    pendingShowIds.delete(show.id);
  }
};
