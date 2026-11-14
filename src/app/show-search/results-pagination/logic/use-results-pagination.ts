import { useShowSearchStore } from '../../logic/show-search.store';
import { useFilteredResults } from '../../logic/use-filtered-results';
import { useSearchStatus } from '../../logic/use-search-status';
import { getPageItems } from './get-page-items';

export const useResultsPagination = () => {
  const { status } = useSearchStatus();
  const { page, totalPages } = useFilteredResults();
  const goToPage = useShowSearchStore((state) => state.goToPage);

  return {
    isVisible: status === 'results' && totalPages > 1,
    items: getPageItems(page, totalPages),
    canGoPrevious: page > 1,
    canGoNext: page < totalPages,
    goToPrevious: () => goToPage(page - 1),
    goToNext: () => goToPage(page + 1),
    goToPage,
  };
};
