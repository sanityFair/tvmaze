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
  /** Number of shows matching the genre filter. */
  total: number;
  /** Number of shows found by the query before genre filtering. */
  totalUnfiltered: number;
  /** All genres of the found shows, sorted alphabetically. */
  genres: string[];
  genre: string | null;
};
