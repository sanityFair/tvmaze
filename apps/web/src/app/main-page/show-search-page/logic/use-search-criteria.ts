import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

import type { SearchCriteria } from './tasks/search-shows';

const readPage = (value: string | null): number => {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 ? page : 1;
};

const toSearchParams = ({ q, genre, page }: SearchCriteria) => {
  const params = new URLSearchParams();
  if (q === '') return params;

  params.set('q', q);
  if (genre) params.set('genre', genre);
  if (page > 1) params.set('page', String(page));
  return params;
};

export const useSearchCriteria = () => {
  const [params, setParams] = useSearchParams();

  const criteria: SearchCriteria = {
    q: params.get('q')?.trim() ?? '',
    genre: params.get('genre') || null,
    page: readPage(params.get('page')),
  };

  const setQuery = useCallback(
    (q: string) => setParams(toSearchParams({ q, genre: null, page: 1 }), { replace: true }),
    [setParams],
  );

  return {
    criteria,
    setQuery,
    setGenre: (genre: string | null) => setParams(toSearchParams({ ...criteria, genre, page: 1 })),
    setPage: (page: number) => setParams(toSearchParams({ ...criteria, page })),
  };
};
