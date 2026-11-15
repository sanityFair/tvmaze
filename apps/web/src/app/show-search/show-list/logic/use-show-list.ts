import { useResultsPage } from '../../logic/use-results-page';
import { useSearchStatus } from '../../logic/use-search-status';
import { useShowSearchStore } from '../../stores/show-search.store';

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
