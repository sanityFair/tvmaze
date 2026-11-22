import { login } from '~/api/auth';
import { hasHttpStatus } from '~/api/http-client';
import { useSessionStore } from '~/stores/session.store';

export type LogInResult = 'signed-in' | 'invalid-email' | 'failed';

export const logIn = async ({ email }: { email: string }): Promise<LogInResult> => {
  const session = useSessionStore.getState();

  try {
    const { user } = await login({ email: email.trim() });
    session.signIn({ user });
    return 'signed-in';
  } catch (reason) {
    const isInvalidEmail = hasHttpStatus(reason, 400);
    return isInvalidEmail ? 'invalid-email' : 'failed';
  }
};
