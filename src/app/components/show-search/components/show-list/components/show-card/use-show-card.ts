import { useMemo } from 'react';

import type { TvMazeShow } from '@/api/tvmaze';

import { formatSummary } from './format-summary';

const getYears = ({ premiered, ended }: TvMazeShow): string | null => {
  const start = premiered?.slice(0, 4);
  const end = ended?.slice(0, 4);

  if (!start) return null;
  if (!end) return `${start}–present`;
  return start === end ? start : `${start}–${end}`;
};

export const useShowCard = (show: TvMazeShow) => {
  const summary = useMemo(() => formatSummary(show.summary), [show.summary]);
  const rating = show.rating.average;

  return {
    title: show.name,
    url: show.url,
    posterUrl: show.image?.medium ?? null,
    years: getYears(show),
    genres: show.genres,
    rating: rating === null ? null : rating.toFixed(1),
    ratingLabel: rating === null ? null : `Rated ${rating.toFixed(1)} out of 10`,
    summary: summary ?? 'No summary yet.',
    hasSummary: summary !== null,
  };
};
