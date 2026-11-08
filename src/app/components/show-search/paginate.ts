export type PageSlice<T> = {
  items: T[];
  page: number;
  totalPages: number;
};

export const paginate = <T>(items: T[], requestedPage: number, pageSize: number): PageSlice<T> => {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (page - 1) * pageSize;

  return { items: items.slice(start, start + pageSize), page, totalPages };
};
