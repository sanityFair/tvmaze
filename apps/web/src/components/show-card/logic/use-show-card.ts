import type { Show } from '@tvmaze/contracts';
import { useMemo } from 'react';

import { selectIsFavorite, useFavoritesStore } from '~/stores/favorites.store';
import { toggleFavorite } from '~/tasks/toggle-favorite';

import { formatSummary } from './format-summary';

const getYears = ({ premiered, ended }: Show): string | null => {
  const start = premiered?.slice(0, 4);
  const end = ended?.slice(0, 4);

  if (!start) return null;
  if (!end) return `${start}–present`;
  return start === end ? start : `${start}–${end}`;
};

export const useShowCard = (show: Show) => {
  const summary = useMemo(() => formatSummary(show.summary), [show.summary]);
  const isFavorite = useFavoritesStore(selectIsFavorite(show.id));
  const rating = show.rating.average;

  return {
    title: show.name,
    url: show.url,
    posterUrl: show.image?.medium ?? null,
    years: getYears(show),
    genres: show.genres,
    hasGenres: show.genres.length > 0,
    rating: rating === null ? null : rating.toFixed(1),
    ratingLabel: rating === null ? null : `Rated ${rating.toFixed(1)} out of 10`,
    summary: summary ?? 'No summary yet.',
    hasSummary: summary !== null,
    isFavorite,
    favoriteLabel: `Favorite ${show.name}`,
    onToggleFavorite: () => void toggleFavorite(show),
  };
};
