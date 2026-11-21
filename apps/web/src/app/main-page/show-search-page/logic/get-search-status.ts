import type { ShowsPage } from '@tvmaze/contracts';

import type { SearchFailure } from './tasks/search-shows';

export type SearchStatus = 'idle' | 'loading' | 'error' | 'empty' | 'results';

export const getSearchStatus = (
  query: string,
  results: ShowsPage | null,
  failure: SearchFailure | null,
): SearchStatus => {
  if (query === '') return 'idle';
  if (results === null) return failure ? 'error' : 'loading';
  return results.totalUnfiltered === 0 ? 'empty' : 'results';
};
