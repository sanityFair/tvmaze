import { useLocation, useNavigate } from 'react-router';

import { FAVORITES_PATH, HOME_PATH } from '~/app/logic/paths';

type FavoritesRouteState = { openedInApp?: boolean } | null;

/** Opens and closes the favorites page so the browser Back button and deep links work. */
export const useFavoritesRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname === FAVORITES_PATH;

  const open = () => {
    if (isOpen) return;
    void navigate(FAVORITES_PATH, { state: { openedInApp: true } });
  };

  const close = () => {
    if (!isOpen) return;
    // We pushed this entry ourselves: going back keeps the history clean.
    if ((location.state as FavoritesRouteState)?.openedInApp) void navigate(-1);
    else void navigate(HOME_PATH, { replace: true });
  };

  return { isOpen, open, close };
};
