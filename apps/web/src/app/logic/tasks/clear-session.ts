import { useFavoritesStore } from '~/app/stores/favorites.store';
import { useSessionStore } from '~/app/stores/session.store';

/** Forgets the current user and their personal data on this device. */
export const clearSession = (): void => {
  useSessionStore.getState().signOut();
  useFavoritesStore.getState().reset();
};
