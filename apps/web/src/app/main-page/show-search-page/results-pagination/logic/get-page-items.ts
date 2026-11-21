export type PageItem =
  | { type: 'page'; page: number; isActive: boolean }
  | { type: 'ellipsis'; key: string };

const MAX_VISIBLE_PAGES = 7;

const range = (count: number) => Array.from({ length: count }, (_, index) => index + 1);

const getVisiblePages = (page: number, totalPages: number): number[] => {
  if (totalPages <= MAX_VISIBLE_PAGES) return range(totalPages);

  const candidates = new Set([1, page - 1, page, page + 1, totalPages]);
  const isInRange = (value: number) => value >= 1 && value <= totalPages;
  return [...candidates].filter(isInRange).sort((a, b) => a - b);
};

export const getPageItems = (page: number, totalPages: number): PageItem[] => {
  const pages = getVisiblePages(page, totalPages);

  return pages.flatMap((value, index): PageItem[] => {
    const item: PageItem = { type: 'page', page: value, isActive: value === page };
    const previous = pages[index - 1];
    const hasGapBefore = previous !== undefined && value - previous > 1;

    if (!hasGapBefore) return [item];
    return [{ type: 'ellipsis', key: `after-${previous}` }, item];
  });
};
