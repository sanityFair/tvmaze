export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const FAVORITES_PATH = '/favorites';

/** `location.state` of the login page; `from` — where to return after signing in. */
export type LoginRouteState = { from?: string } | null;
