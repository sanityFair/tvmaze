import { useState } from 'react';
import { useNavigate } from 'react-router';

import { HOME_PATH } from '~/app/logic/paths';
import { logOut } from '~/app/logic/tasks/log-out';
import { useFavoritesRoute } from '~/app/main-page/logic/use-favorites-route';
import { selectUserEmail, useSessionStore } from '~/app/stores/session.store';

export const useUserMenu = () => {
  const navigate = useNavigate();
  const favoritesRoute = useFavoritesRoute();
  const email = useSessionStore(selectUserEmail);
  const [isLoggingOut, setLoggingOut] = useState(false);

  return {
    email: email ?? '',
    isLoggingOut,
    onLogOut: () => {
      setLoggingOut(true);
      if (favoritesRoute.isOpen) navigate(HOME_PATH, { replace: true });
      logOut();
    },
  };
};
