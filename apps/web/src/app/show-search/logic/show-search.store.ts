import type { ShowsPage } from '@tvmaze/contracts';
import { create } from 'zustand';

type ShowSearchState = {
  query: string;
  loadedQuery: string | null;
  response: ShowsPage | null;
  isLoading: boolean;
  error: Error | null;
};

type ShowSearchActions = {
  startSearch: (query: string) => void;
  receiveResults: (query: string, response: ShowsPage) => void;
  failSearch: (error: Error) => void;
  restoreLoaded: () => void;
  resetSearch: () => void;
};

const INITIAL_STATE: ShowSearchState = {
  query: '',
  loadedQuery: null,
  response: null,
  isLoading: false,
  error: null,
};

export const useShowSearchStore = create<ShowSearchState & ShowSearchActions>()((set) => ({
  ...INITIAL_STATE,
  startSearch: (query) => set({ query, isLoading: true, error: null }),
  receiveResults: (query, response) =>
    set({ loadedQuery: query, response, isLoading: false, error: null }),
  failSearch: (error) => set({ isLoading: false, error }),
  restoreLoaded: () =>
    set((state) => ({ query: state.loadedQuery ?? '', isLoading: false, error: null })),
  resetSearch: () => set(INITIAL_STATE),
}));
