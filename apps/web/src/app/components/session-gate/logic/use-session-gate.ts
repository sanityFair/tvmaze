import { useLocation } from 'react-router';

import { HOME_PATH, LOGIN_PATH, type LoginRouteState } from '~/app/logic/paths';
import { selectSessionStatus, useSessionStore } from '~/app/stores/session.store';

export type SessionAccess = 'user' | 'guest';

type SessionGateResult =
  | { kind: 'pending' }
  | { kind: 'allow' }
  | { kind: 'redirect'; to: string; state?: LoginRouteState };

export const useSessionGate = (access: SessionAccess): SessionGateResult => {
  const status = useSessionStore(selectSessionStatus);
  const location = useLocation();

  if (status === 'unknown') return { kind: 'pending' };

  const needsSignIn = access === 'user' && status === 'anonymous';
  if (needsSignIn) {
    return { kind: 'redirect', to: LOGIN_PATH, state: { from: location.pathname } };
  }

  const isAlreadySignedIn = access === 'guest' && status === 'authenticated';
  if (isAlreadySignedIn) {
    const returnPath = (location.state as LoginRouteState)?.from ?? HOME_PATH;
    return { kind: 'redirect', to: returnPath };
  }

  return { kind: 'allow' };
};
