import type { ShowsPage } from '@tvmaze/contracts';

import { describeSearchFailure } from './describe-search-failure';
import { formatResultsSummary } from './format-results-summary';
import { getSearchStatus } from './get-search-status';
import { useSearchCriteria } from './use-search-criteria';
import { useSearchResults } from './use-search-results';

const NO_RESULTS = { shows: [], summary: '', genres: [], page: 1, totalPages: 1 };

const describeResults = (results: ShowsPage) => ({
  shows: results.items,
  summary: formatResultsSummary(results.total, results.totalUnfiltered, results.genre),
  genres: results.genres,
  page: results.page,
  totalPages: results.totalPages,
});

export const useShowSearchPage = () => {
  const search = useSearchCriteria();
  const { results, isLoading, failure } = useSearchResults(search.criteria);

  const status = getSearchStatus(search.criteria.q, results, failure);
  const hasResults = status === 'results' && results !== null;
  const view = hasResults ? describeResults(results) : NO_RESULTS;

  const errorMessage = failure ? describeSearchFailure(failure) : null;
  const isShowingPreviousResults = status === 'results' || status === 'empty';

  return {
    query: search.criteria.q,
    isLoading,
    onQueryChange: search.setQuery,

    status,
    errorMessage,
    inlineErrorMessage: isShowingPreviousResults ? errorMessage : null,

    hasResults,
    shows: view.shows,
    summary: view.summary,

    hasGenres: view.genres.length > 0,
    genres: view.genres,
    selectedGenre: search.criteria.genre,
    onGenreChange: search.setGenre,

    hasPages: view.totalPages > 1,
    page: view.page,
    totalPages: view.totalPages,
    onPageChange: search.setPage,
  };
};
