import { useLocation, useNavigate } from 'react-router';

import { LOGIN_PATH, type LoginRouteState } from '~/lib/paths';

export const useSignInRoute = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return () => {
    navigate(LOGIN_PATH, { state: { from: pathname } satisfies LoginRouteState });
  };
};
