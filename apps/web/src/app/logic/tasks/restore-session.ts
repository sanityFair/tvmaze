import { fetchCurrentUser } from '~/api/auth';
import { useSessionStore } from '~/app/stores/session.store';

export const restoreSession = async (): Promise<void> => {
  try {
    useSessionStore.getState().signIn(await fetchCurrentUser());
  } catch {
    useSessionStore.getState().signOut();
  }
};
