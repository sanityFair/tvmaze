import { useEffect } from 'react';

import { restoreSession } from './tasks/restore-session';
import { watchSessionExpiry } from './tasks/watch-session-expiry';

/** Restores the session on start and signs out when the API rejects it later on. */
export const useApp = () => {
  useEffect(() => {
    void restoreSession();
    return watchSessionExpiry();
  }, []);
};
