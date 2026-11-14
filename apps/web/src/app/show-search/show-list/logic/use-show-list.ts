import { useShowSearchStore } from '../../logic/show-search.store';
import { useResultsPage } from '../../logic/use-results-page';
import { useSearchStatus } from '../../logic/use-search-status';

export const useShowList = () => {
  const { status } = useSearchStatus();
  const { visibleShows, summary } = useResultsPage();
  const isUpdating = useShowSearchStore((state) => state.isLoading);

  return {
    isVisible: status === 'results',
    shows: visibleShows,
    summary,
    isUpdating,
  };
};
