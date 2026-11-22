import { useLocation, useNavigate } from 'react-router';

import { FAVORITES_PATH, HOME_PATH } from '~/lib/paths';

type FavoritesRouteState = { openedInApp?: boolean } | null;

export const useFavoritesRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname === FAVORITES_PATH;

  const open = () => {
    if (isOpen) return;
    navigate(FAVORITES_PATH, { state: { openedInApp: true } });
  };

  const close = () => {
    if (!isOpen) return;

    const wasOpenedInApp = (location.state as FavoritesRouteState)?.openedInApp === true;
    if (wasOpenedInApp) {
      navigate(-1);
      return;
    }

    navigate(HOME_PATH, { replace: true });
  };

  return { isOpen, open, close };
};
