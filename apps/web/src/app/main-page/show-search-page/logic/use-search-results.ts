import type { ShowsPage } from '@tvmaze/contracts';
import { useEffect, useState } from 'react';

import { type SearchCriteria, type SearchFailure, searchShows } from './tasks/search-shows';

type SearchResultsState = {
  query: string;
  settledKey: string | null;
  results: ShowsPage | null;
  failure: SearchFailure | null;
};

const INITIAL_STATE: SearchResultsState = {
  query: '',
  settledKey: null,
  results: null,
  failure: null,
};

export const useSearchResults = ({ q, genre, page }: SearchCriteria) => {
  const [state, setState] = useState(INITIAL_STATE);
  const key = JSON.stringify([q, genre, page]);

  useEffect(() => {
    if (q === '') return;

    const request = new AbortController();

    searchShows({ q, genre, page }, request.signal).then((result) => {
      if (result.status === 'loaded') {
        setState({ query: q, settledKey: key, results: result.results, failure: null });
      }
      if (result.status === 'failed') {
        setState((current) => ({
          query: q,
          settledKey: key,
          results: current.query === q ? current.results : null,
          failure: result.failure,
        }));
      }
    });

    return () => request.abort();
  }, [key, q, genre, page]);

  const hasQuery = q !== '';
  const isSameQuery = hasQuery && state.query === q;
  const isSettled = state.settledKey === key;

  return {
    results: isSameQuery ? state.results : null,
    failure: isSameQuery ? state.failure : null,
    isLoading: hasQuery && !isSettled,
  };
};
