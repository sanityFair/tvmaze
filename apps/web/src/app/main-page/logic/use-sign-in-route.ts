import { useLocation, useNavigate } from 'react-router';

import { LOGIN_PATH, type LoginRouteState } from '~/app/logic/paths';

/** Opens the login page so that a successful sign-in brings the user back here. */
export const useSignInRoute = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return () => {
    void navigate(LOGIN_PATH, { state: { from: pathname } satisfies LoginRouteState });
  };
};
