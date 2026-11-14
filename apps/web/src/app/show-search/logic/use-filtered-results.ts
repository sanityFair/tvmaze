import { useMemo } from 'react';

import { collectGenres } from './collect-genres';
import { formatResultsSummary } from './format-results-summary';
import { useShowSearchStore } from './show-search.store';
import { slicePage } from './slice-page';

const PAGE_SIZE = 3;

export const useFilteredResults = () => {
  const results = useShowSearchStore((state) => state.results);
  const selectedGenre = useShowSearchStore((state) => state.genre);
  const requestedPage = useShowSearchStore((state) => state.page);

  const shows = useMemo(() => results?.map(({ show }) => show) ?? [], [results]);
  const genres = useMemo(() => collectGenres(shows), [shows]);
  const filteredShows = useMemo(
    () => (selectedGenre ? shows.filter((show) => show.genres.includes(selectedGenre)) : shows),
    [shows, selectedGenre],
  );
  const { items, page, totalPages } = slicePage(filteredShows, requestedPage, PAGE_SIZE);

  return {
    genres,
    selectedGenre,
    visibleShows: items,
    page,
    totalPages,
    summary: formatResultsSummary(filteredShows.length, shows.length, selectedGenre),
  };
};
