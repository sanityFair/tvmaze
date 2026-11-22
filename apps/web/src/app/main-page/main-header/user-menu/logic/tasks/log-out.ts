import { logout } from '~/api/auth';
import { useSessionStore } from '~/stores/session.store';

export const logOut = async (): Promise<void> => {
  const session = useSessionStore.getState();

  try {
    await logout();
  } catch {}

  session.signOut();
};
