import { getPageItems } from './get-page-items';

type UseResultsPaginationOptions = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const useResultsPagination = ({
  page,
  totalPages,
  onPageChange,
}: UseResultsPaginationOptions) => ({
  isVisible: totalPages > 1,
  items: getPageItems(page, totalPages),
  page,
  canGoPrevious: page > 1,
  canGoNext: page < totalPages,
  goToPrevious: () => onPageChange(page - 1),
  goToNext: () => onPageChange(page + 1),
  goToPage: onPageChange,
});
