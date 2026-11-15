import { useState } from 'react';

import { goToNextPage, goToPage, goToPreviousPage } from '../../logic/tasks/go-to-page';
import { useResultsPage } from '../../logic/use-results-page';
import { useSearchStatus } from '../../logic/use-search-status';
import { getPageItems } from './get-page-items';

export const useResultsPagination = () => {
  const { status } = useSearchStatus();
  const { page, totalPages } = useResultsPage();
  const [isNavigating, setNavigating] = useState(false);

  const navigate = async (transition: () => Promise<void>) => {
    setNavigating(true);
    try {
      await transition();
    } finally {
      setNavigating(false);
    }
  };

  return {
    isVisible: status === 'results' && totalPages > 1,
    items: getPageItems(page, totalPages),
    isNavigating,
    canGoPrevious: !isNavigating && page > 1,
    canGoNext: !isNavigating && page < totalPages,
    goToPrevious: () => void navigate(goToPreviousPage),
    goToNext: () => void navigate(goToNextPage),
    goToPage: (target: number) => void navigate(() => goToPage(target)),
  };
};
