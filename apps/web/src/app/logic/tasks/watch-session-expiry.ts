import { onUnauthorized } from '~/api/http-client';
import { useSessionStore } from '~/stores/session.store';

export const watchSessionExpiry = (): (() => void) => {
  const session = useSessionStore.getState();
  return onUnauthorized(() => session.signOut());
};
