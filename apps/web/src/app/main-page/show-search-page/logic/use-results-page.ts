import {
  selectPage,
  selectGenre,
  selectResponse,
  useShowSearchStore,
} from '../stores/show-search.store';
import { formatResultsSummary } from './format-results-summary';

export const useResultsPage = () => {
  const response = useShowSearchStore(selectResponse);
  const selectedGenre = useShowSearchStore(selectGenre);
  const page = useShowSearchStore(selectPage);

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
