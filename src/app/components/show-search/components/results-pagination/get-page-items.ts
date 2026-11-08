export type PageItem = { type: 'page'; page: number } | { type: 'ellipsis'; key: string };

const MAX_VISIBLE_PAGES = 7;

export const getPageItems = (page: number, totalPages: number): PageItem[] => {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, index) => ({ type: 'page', page: index + 1 }));
  }

  const pages = [1, page - 1, page, page + 1, totalPages]
    .filter(
      (value, index, all) => value >= 1 && value <= totalPages && all.indexOf(value) === index,
    )
    .sort((a, b) => a - b);

  return pages.flatMap((value, index): PageItem[] => {
    const previous = pages[index - 1];
    const item: PageItem = { type: 'page', page: value };
    return previous !== undefined && value - previous > 1
      ? [{ type: 'ellipsis', key: `after-${previous}` }, item]
      : [item];
  });
};
