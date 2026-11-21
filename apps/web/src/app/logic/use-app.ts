import { useEffect } from 'react';

import { restoreSession } from './tasks/restore-session';
import { watchSessionExpiry } from './tasks/watch-session-expiry';

export const useApp = () => {
  useEffect(() => {
    void restoreSession();
    return watchSessionExpiry();
  }, []);
};
