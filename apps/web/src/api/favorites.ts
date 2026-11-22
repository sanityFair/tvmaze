import type { Show } from '@tvmaze/contracts';

import { apiRequest } from './http-client';

type FavoriteRequest = { showId: number };

export const fetchFavorites = (): Promise<Show[]> => apiRequest<Show[]>('/favorites');

export const addFavorite = ({ showId }: FavoriteRequest): Promise<Show> =>
  apiRequest<Show>(`/favorites/${showId}`, { method: 'PUT' });

export const removeFavorite = ({ showId }: FavoriteRequest): Promise<void> =>
  apiRequest<void>(`/favorites/${showId}`, { method: 'DELETE' });
