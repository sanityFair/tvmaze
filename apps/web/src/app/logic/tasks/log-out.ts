import { logout } from '~/api/auth';

import { clearSession } from './clear-session';

export const logOut = async (): Promise<void> => {
  try {
    await logout();
  } catch {
    // The cookie may outlive a failed request, but the user still asked to leave.
  }
  clearSession();
};
