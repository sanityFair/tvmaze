import type { Show } from '@tvmaze/contracts';

import { apiRequest } from './http-client';

export const fetchFavorites = (): Promise<Show[]> => apiRequest<Show[]>('/favorites');

export const addFavorite = (showId: number): Promise<Show> =>
  apiRequest<Show>(`/favorites/${showId}`, { method: 'PUT' });

export const removeFavorite = (showId: number): Promise<void> =>
  apiRequest<void>(`/favorites/${showId}`, { method: 'DELETE' });
