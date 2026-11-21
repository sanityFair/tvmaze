import { useState } from 'react';

import { logOut } from '~/app/logic/tasks/log-out';
import { selectUserEmail, useSessionStore } from '~/app/stores/session.store';

export const useUserMenu = () => {
  const email = useSessionStore(selectUserEmail);
  const [isLoggingOut, setLoggingOut] = useState(false);

  return {
    email: email ?? '',
    isLoggingOut,
    // The session gate sends the user to the login page once the session is cleared.
    onLogOut: () => {
      setLoggingOut(true);
      void logOut();
    },
  };
};
