import type { Show } from './show.js';

export type ShowsPageQuery = {
  q: string;
  genre?: string;
  page?: number;
  pageSize?: number;
};

export type ShowsPage = {
  items: Show[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  totalUnfiltered: number;
  genres: string[];
  genre: string | null;
};
