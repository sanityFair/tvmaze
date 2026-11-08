import { useMemo, useState } from 'react';

import type { TvMazeSearchResult } from '@/api/tvmaze';

import { collectGenres } from './collect-genres';
import { formatResultsSummary } from './format-results-summary';
import { paginate } from './paginate';

const PAGE_SIZE = 3;

type FilterState = {
  source: TvMazeSearchResult[] | null;
  genre: string | null;
  page: number;
};

export const useResultsFilter = (results: TvMazeSearchResult[] | null) => {
  const [filter, setFilter] = useState<FilterState>({ source: results, genre: null, page: 1 });

  const isCurrent = filter.source === results;
  const selectedGenre = isCurrent ? filter.genre : null;
  const requestedPage = isCurrent ? filter.page : 1;

  const shows = useMemo(() => results?.map(({ show }) => show) ?? [], [results]);
  const genres = useMemo(() => collectGenres(shows), [shows]);
  const filteredShows = useMemo(
    () => (selectedGenre ? shows.filter((show) => show.genres.includes(selectedGenre)) : shows),
    [shows, selectedGenre],
  );
  const { items, page, totalPages } = paginate(filteredShows, requestedPage, PAGE_SIZE);

  const selectGenre = (genre: string | null) => {
    setFilter({ source: results, genre, page: 1 });
  };

  const goToPage = (nextPage: number) => {
    setFilter({ source: results, genre: selectedGenre, page: nextPage });
  };

  return {
    genres,
    selectedGenre,
    visibleShows: items,
    page,
    totalPages,
    resultsSummary: formatResultsSummary(filteredShows.length, shows.length, selectedGenre),
    onGenreChange: selectGenre,
    onPageChange: goToPage,
  };
};
