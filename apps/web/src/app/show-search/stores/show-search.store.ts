import type { ShowsPage } from '@tvmaze/contracts';
import { create } from 'zustand';

type ShowSearchState = {
  query: string;
  genre: string | null;
  page: number;
  response: ShowsPage | null;
  isLoading: boolean;
  error: Error | null;
};

type ShowSearchActions = {
  setQuery: (query: string) => void;
  selectGenre: (genre: string | null) => void;
  setPage: (page: number) => void;
  startLoading: () => void;
  receiveResults: (response: ShowsPage) => void;
  failLoading: (error: Error) => void;
};

const INITIAL_STATE: ShowSearchState = {
  query: '',
  genre: null,
  page: 1,
  response: null,
  isLoading: false,
  error: null,
};

export const useShowSearchStore = create<ShowSearchState & ShowSearchActions>()((set) => ({
  ...INITIAL_STATE,
  setQuery: (query) =>
    set((state) => {
      if (query === state.query) return state;
      return query === '' ? INITIAL_STATE : { query, genre: null, page: 1 };
    }),
  selectGenre: (genre) => set({ genre, page: 1 }),
  setPage: (page) => set({ page }),
  startLoading: () => set({ isLoading: true, error: null }),
  receiveResults: (response) => set({ response, isLoading: false, error: null }),
  failLoading: (error) => set({ isLoading: false, error }),
}));

export const selectQuery = (state: ShowSearchState) => state.query;
export const selectGenre = (state: ShowSearchState) => state.genre;
export const selectPage = (state: ShowSearchState) => state.page;
export const selectResponse = (state: ShowSearchState) => state.response;
export const selectIsLoading = (state: ShowSearchState) => state.isLoading;
export const selectError = (state: ShowSearchState) => state.error;
