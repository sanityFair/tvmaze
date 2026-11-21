import { useLocation } from 'react-router';

import { HOME_PATH, LOGIN_PATH, type LoginRouteState } from '~/app/logic/paths';
import { selectSessionStatus, useSessionStore } from '~/app/stores/session.store';

/** `user` pages need a session; `guest` pages (login) are only for signed-out visitors. */
export type SessionAccess = 'user' | 'guest';

type SessionGateResult =
  | { kind: 'pending' }
  | { kind: 'allow' }
  | { kind: 'redirect'; to: string; state?: LoginRouteState };

export const useSessionGate = (access: SessionAccess): SessionGateResult => {
  const status = useSessionStore(selectSessionStatus);
  const location = useLocation();

  if (status === 'unknown') return { kind: 'pending' };

  if (access === 'user' && status === 'anonymous') {
    return { kind: 'redirect', to: LOGIN_PATH, state: { from: location.pathname } };
  }
  if (access === 'guest' && status === 'authenticated') {
    return { kind: 'redirect', to: (location.state as LoginRouteState)?.from ?? HOME_PATH };
  }
  return { kind: 'allow' };
};
