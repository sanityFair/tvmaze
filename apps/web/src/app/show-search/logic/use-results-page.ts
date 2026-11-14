import { formatResultsSummary } from './format-results-summary';
import { useShowSearchStore } from './show-search.store';

export const useResultsPage = () => {
  const response = useShowSearchStore((state) => state.response);
  const selectedGenre = useShowSearchStore((state) => state.genre);
  const page = useShowSearchStore((state) => state.page);

  return {
    genres: response?.genres ?? [],
    selectedGenre,
    visibleShows: response?.items ?? [],
    page,
    totalPages: response?.totalPages ?? 1,
    summary: response
      ? formatResultsSummary(response.total, response.totalUnfiltered, response.genre)
      : '',
  };
};
