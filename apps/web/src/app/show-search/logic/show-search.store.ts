import { create } from 'zustand';

import type { TvMazeSearchResult } from '~/api/tvmaze';

type ShowSearchState = {
  query: string;
  loadedQuery: string | null;
  results: TvMazeSearchResult[] | null;
  isLoading: boolean;
  error: Error | null;
  genre: string | null;
  page: number;
};

type ShowSearchActions = {
  startSearch: (query: string) => void;
  receiveResults: (query: string, results: TvMazeSearchResult[]) => void;
  failSearch: (error: Error) => void;
  restoreLoaded: () => void;
  resetSearch: () => void;
  selectGenre: (genre: string | null) => void;
  goToPage: (page: number) => void;
};

const INITIAL_STATE: ShowSearchState = {
  query: '',
  loadedQuery: null,
  results: null,
  isLoading: false,
  error: null,
  genre: null,
  page: 1,
};

export const useShowSearchStore = create<ShowSearchState & ShowSearchActions>()((set) => ({
  ...INITIAL_STATE,
  startSearch: (query) => set({ query, isLoading: true, error: null }),
  receiveResults: (query, results) =>
    set({ loadedQuery: query, results, isLoading: false, error: null, genre: null, page: 1 }),
  failSearch: (error) => set({ isLoading: false, error }),
  restoreLoaded: () =>
    set((state) => ({ query: state.loadedQuery ?? '', isLoading: false, error: null })),
  resetSearch: () => set(INITIAL_STATE),
  selectGenre: (genre) => set({ genre, page: 1 }),
  goToPage: (page) => set({ page }),
}));
