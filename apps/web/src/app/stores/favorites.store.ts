import type { Show } from '@tvmaze/contracts';
import { create } from 'zustand';

export type FavoritesStatus = 'idle' | 'loading' | 'ready' | 'error';

type FavoritesState = {
  shows: Show[];
  status: FavoritesStatus;
};

type FavoritesActions = {
  startLoading: () => void;
  receiveFavorites: (shows: Show[]) => void;
  failLoading: () => void;
  addShow: (show: Show) => void;
  removeShow: (showId: number) => void;
};

export const useFavoritesStore = create<FavoritesState & FavoritesActions>()((set) => ({
  shows: [],
  status: 'idle',
  startLoading: () => set({ status: 'loading' }),
  receiveFavorites: (shows) => set({ shows, status: 'ready' }),
  failLoading: () => set({ status: 'error' }),
  addShow: (show) =>
    set((state) =>
      state.shows.some(({ id }) => id === show.id) ? state : { shows: [show, ...state.shows] },
    ),
  removeShow: (showId) =>
    set((state) => ({ shows: state.shows.filter(({ id }) => id !== showId) })),
}));

export const selectIsFavorite = (showId: number) => (state: FavoritesState) =>
  state.shows.some(({ id }) => id === showId);
