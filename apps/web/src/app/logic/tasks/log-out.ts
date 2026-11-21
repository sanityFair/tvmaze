import { logout } from '~/api/auth';
import { useSessionStore } from '~/app/stores/session.store';

export const logOut = async (): Promise<void> => {
  try {
    await logout();
  } catch {}
  useSessionStore.getState().signOut();
};
