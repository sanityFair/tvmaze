import type { ShowsPage } from '@tvmaze/contracts';

import {
  selectError,
  selectResponse,
  selectQuery,
  useShowSearchStore,
} from '../stores/show-search.store';
import { describeSearchError } from './describe-search-error';

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
  const query = useShowSearchStore(selectQuery);
  const response = useShowSearchStore(selectResponse);
  const error = useShowSearchStore(selectError);

  const status = getSearchStatus(query, response, error);
  const errorMessage = error ? describeSearchError(error) : null;
  const hasPreviousResponse = status === 'empty' || status === 'results';

  return {
    status,
    errorMessage,
    inlineErrorMessage: hasPreviousResponse ? errorMessage : null,
  };
};
