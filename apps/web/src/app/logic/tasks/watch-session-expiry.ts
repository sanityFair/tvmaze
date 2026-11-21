import { onUnauthorized } from '~/api/http-client';
import { useSessionStore } from '~/app/stores/session.store';

export const watchSessionExpiry = (): (() => void) =>
  onUnauthorized(() => useSessionStore.getState().signOut());
