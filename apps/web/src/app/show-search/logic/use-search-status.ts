import type { ShowsPage } from '@tvmaze/contracts';

import { describeSearchError } from './describe-search-error';
import { useShowSearchStore } from './show-search.store';

export type SearchStatus = 'idle' | 'loading' | 'error' | 'empty' | 'results';

const getSearchStatus = (
  query: string,
  response: ShowsPage | null,
  error: Error | null,
): SearchStatus => {
  if (query === '') return 'idle';
  if (response === null) return error ? 'error' : 'loading';
  return response.totalUnfiltered === 0 ? 'empty' : 'results';
};

export const useSearchStatus = () => {
  const query = useShowSearchStore((state) => state.query);
  const response = useShowSearchStore((state) => state.response);
  const error = useShowSearchStore((state) => state.error);

  const status = getSearchStatus(query, response, error);
  const errorMessage = error ? describeSearchError(error) : null;
  const hasPreviousResponse = status === 'empty' || status === 'results';

  return {
    status,
    errorMessage,
    inlineErrorMessage: hasPreviousResponse ? errorMessage : null,
  };
};
