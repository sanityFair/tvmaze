import { fetchCurrentUser } from '~/api/auth';
import { useSessionStore } from '~/stores/session.store';

export const restoreSession = async (): Promise<void> => {
  const session = useSessionStore.getState();

  try {
    const { user } = await fetchCurrentUser();
    session.signIn({ user });
  } catch {
    session.signOut();
  }
};
