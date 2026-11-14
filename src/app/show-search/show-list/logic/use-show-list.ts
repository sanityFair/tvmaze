import { useShowSearchStore } from '../../logic/show-search.store';
import { useFilteredResults } from '../../logic/use-filtered-results';
import { useSearchStatus } from '../../logic/use-search-status';

export const useShowList = () => {
  const { status } = useSearchStatus();
  const { visibleShows, summary } = useFilteredResults();
  const isUpdating = useShowSearchStore((state) => state.isLoading);

  return {
    isVisible: status === 'results',
    shows: visibleShows,
    summary,
    isUpdating,
  };
};
