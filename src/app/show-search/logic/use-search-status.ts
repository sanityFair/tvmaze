import type { TvMazeSearchResult } from '~/api/tvmaze';

import { describeSearchError } from './describe-search-error';
import { useShowSearchStore } from './show-search.store';

export type SearchStatus = 'idle' | 'loading' | 'error' | 'empty' | 'results';

const getSearchStatus = (
  query: string,
  results: TvMazeSearchResult[] | null,
  error: Error | null,
): SearchStatus => {
  if (query === '') return 'idle';
  if (results === null) return error ? 'error' : 'loading';
  return results.length === 0 ? 'empty' : 'results';
};

export const useSearchStatus = () => {
  const query = useShowSearchStore((state) => state.query);
  const results = useShowSearchStore((state) => state.results);
  const error = useShowSearchStore((state) => state.error);

  const status = getSearchStatus(query, results, error);
  const errorMessage = error ? describeSearchError(error) : null;
  const hasPreviousResponse = status === 'empty' || status === 'results';

  return {
    status,
    errorMessage,
    inlineErrorMessage: hasPreviousResponse ? errorMessage : null,
  };
};
