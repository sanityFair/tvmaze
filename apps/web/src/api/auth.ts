import type { LoginRequest, SessionUser } from '@tvmaze/contracts';

import { apiRequest } from './http-client';

export const login = (email: string): Promise<SessionUser> =>
  apiRequest<SessionUser>('/auth/login', {
    method: 'POST',
    body: { email } satisfies LoginRequest,
  });

export const logout = (): Promise<void> => apiRequest<void>('/auth/logout', { method: 'POST' });

export const fetchCurrentUser = (): Promise<SessionUser> => apiRequest<SessionUser>('/auth/me');
