import { onUnauthorized } from '~/api/http-client';

import { clearSession } from './clear-session';

/** Signs the user out as soon as the API reports the session is gone. Returns an unsubscribe. */
export const watchSessionExpiry = (): (() => void) => onUnauthorized(clearSession);
