import { login } from '~/api/auth';
import { hasHttpStatus } from '~/api/http-client';
import { useSessionStore } from '~/app/stores/session.store';

export type LogInResult = 'signed-in' | 'invalid-email' | 'failed';

export const logIn = async (email: string): Promise<LogInResult> => {
  try {
    useSessionStore.getState().signIn(await login(email.trim()));
    return 'signed-in';
  } catch (reason) {
    return hasHttpStatus(reason, 400) ? 'invalid-email' : 'failed';
  }
};
