import type { Show } from '@tvmaze/contracts';
import { create } from 'zustand';

export type FavoritesStatus = 'idle' | 'loading' | 'ready' | 'error';

type FavoritesState = {
  shows: Show[];
  status: FavoritesStatus;
};

type FavoritesActions = {
  setStatus: (update: { status: FavoritesStatus }) => void;
  setShows: (update: { shows: Show[] }) => void;
  reset: () => void;
};

const INITIAL_STATE: FavoritesState = { shows: [], status: 'idle' };

export const useFavoritesStore = create<FavoritesState & FavoritesActions>()((set) => ({
  ...INITIAL_STATE,
  setStatus: ({ status }) => set({ status }),
  setShows: ({ shows }) => set({ shows }),
  reset: () => set(INITIAL_STATE),
}));

export const selectFavoriteShows = (state: FavoritesState) => state.shows;
export const selectFavoritesStatus = (state: FavoritesState) => state.status;
export const selectFavoritesCount = (state: FavoritesState) => state.shows.length;

export const selectIsFavorite = (showId: number) => (state: FavoritesState) =>
  state.shows.some(({ id }) => id === showId);
