import { formatResultsSummary } from './format-results-summary';
import { useShowSearchStore } from './show-search.store';

export const useResultsPage = () => {
  const response = useShowSearchStore((state) => state.response);

  return {
    genres: response?.genres ?? [],
    selectedGenre: response?.genre ?? null,
    visibleShows: response?.items ?? [],
    page: response?.page ?? 1,
    totalPages: response?.totalPages ?? 1,
    summary: response
      ? formatResultsSummary(response.total, response.totalUnfiltered, response.genre)
      : '',
  };
};
