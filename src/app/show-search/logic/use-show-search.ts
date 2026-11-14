import debounce from 'debounce';
import { useEffect, useState } from 'react';

import { SEARCH_SHOWS_PATH, type TvMazeSearchResult } from '~/api/tvmaze';
import { useApiQuery } from '~/hooks/use-api-query';

import { describeSearchError } from './describe-search-error';
import { useResultsFilter } from './use-results-filter';

const SEARCH_DEBOUNCE_MS = 400;

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

export const useShowSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [commitQuery] = useState(() => debounce(setQuery, SEARCH_DEBOUNCE_MS));

  useEffect(() => () => commitQuery.clear(), [commitQuery]);

  const { data, isLoading, error } = useApiQuery<TvMazeSearchResult[]>({
    path: SEARCH_SHOWS_PATH,
    params: { q: query },
    enabled: query !== '',
  });
  const filter = useResultsFilter(data);
  const status = getSearchStatus(query, data, error);
  const errorMessage = error ? describeSearchError(error) : null;
  const hasPreviousResponse = status === 'empty' || status === 'results';

  const handleInputChange = (value: string) => {
    setInputValue(value);
    commitQuery(value.trim());
  };

  const handleInputClear = () => {
    commitQuery.clear();
    setInputValue('');
    setQuery('');
  };

  return {
    inputValue,
    status,
    isLoading,
    hasResults: status === 'results',
    hasGenreFilter: status === 'results' && filter.genres.length > 0,
    errorMessage,
    inlineErrorMessage: hasPreviousResponse ? errorMessage : null,
    onInputChange: handleInputChange,
    onInputClear: handleInputClear,
    ...filter,
  };
};
