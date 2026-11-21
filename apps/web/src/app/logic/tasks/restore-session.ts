import { fetchCurrentUser } from '~/api/auth';
import { useSessionStore } from '~/app/stores/session.store';

let pendingRestore: Promise<void> | null = null;

/** Asks the API who is signed in; the API also extends the session cookie. */
export const restoreSession = (): Promise<void> => {
  pendingRestore ??= fetchCurrentUser()
    .then((user) => useSessionStore.getState().signIn(user))
    .catch(() => useSessionStore.getState().signOut())
    .finally(() => {
      pendingRestore = null;
    });
  return pendingRestore;
};
