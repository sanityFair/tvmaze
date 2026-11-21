import { getPageItems } from './get-page-items';

export type ResultsPaginationProps = {
  page: number;
  totalPages: number;
  isBusy: boolean;
  onPageChange: (page: number) => void;
};

export const useResultsPagination = ({
  page,
  totalPages,
  isBusy,
  onPageChange,
}: ResultsPaginationProps) => ({
  items: getPageItems(page, totalPages),
  isBusy,
  canGoPrevious: !isBusy && page > 1,
  canGoNext: !isBusy && page < totalPages,
  goToPrevious: () => onPageChange(page - 1),
  goToNext: () => onPageChange(page + 1),
  goToPage: onPageChange,
});
