import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/ui-kit/pagination';

import { useResultsPagination } from './logic/use-results-pagination';

type ResultsPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const ResultsPagination = (props: ResultsPaginationProps) => {
  const pagination = useResultsPagination(props);

  if (!pagination.isVisible) return null;

  return (
    <Pagination aria-label="Results pages" className="pt-2">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            text="Previous"
            aria-label="Previous page"
            disabled={!pagination.canGoPrevious}
            onClick={pagination.goToPrevious}
          />
        </PaginationItem>
        {pagination.items.map((item) =>
          item.type === 'ellipsis' ? (
            <PaginationItem key={item.key}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item.page}>
              <PaginationLink
                isActive={item.isActive}
                aria-label={`Page ${item.page}`}
                onClick={() => pagination.goToPage(item.page)}
                className="tabular-nums"
              >
                {item.page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            text="Next"
            aria-label="Next page"
            disabled={!pagination.canGoNext}
            onClick={pagination.goToNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
