import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { FAVORITES_PATH, HOME_PATH } from '~/lib/paths';
import { selectUserEmail, useSessionStore } from '~/stores/session.store';

import { logOut } from './tasks/log-out';

export const useUserMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const email = useSessionStore(selectUserEmail);
  const [isLoggingOut, setLoggingOut] = useState(false);

  const handleLogOut = () => {
    setLoggingOut(true);
    const isOnPersonalPage = pathname === FAVORITES_PATH;
    if (isOnPersonalPage) navigate(HOME_PATH, { replace: true });
    logOut();
  };

  return {
    email: email ?? '',
    isLoggingOut,
    onLogOut: handleLogOut,
  };
};
