import { goToPage } from '../../logic/tasks/go-to-page';
import { useResultsPage } from '../../logic/use-results-page';
import { useSearchStatus } from '../../logic/use-search-status';
import { getPageItems } from './get-page-items';

export const useResultsPagination = () => {
  const { status } = useSearchStatus();
  const { page, totalPages } = useResultsPage();

  return {
    isVisible: status === 'results' && totalPages > 1,
    items: getPageItems(page, totalPages),
    canGoPrevious: page > 1,
    canGoNext: page < totalPages,
    goToPrevious: () => void goToPage(page - 1),
    goToNext: () => void goToPage(page + 1),
    goToPage: (target: number) => void goToPage(target),
  };
};
