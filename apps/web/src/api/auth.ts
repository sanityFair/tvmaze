import type { LoginRequest, SessionResponse } from '@tvmaze/contracts';

import { apiRequest } from './http-client';

export const login = (request: LoginRequest): Promise<SessionResponse> =>
  apiRequest<SessionResponse>('/auth/login', { method: 'POST', body: request });

export const logout = (): Promise<void> => apiRequest<void>('/auth/logout', { method: 'POST' });

export const fetchCurrentUser = (): Promise<SessionResponse> =>
  apiRequest<SessionResponse>('/auth/me');
