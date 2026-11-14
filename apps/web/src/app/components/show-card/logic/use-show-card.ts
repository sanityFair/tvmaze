import type { Show } from '@tvmaze/contracts';

import { selectIsFavorite, useFavoritesStore } from '~/app/logic/favorites.store';
import { toggleFavorite } from '~/app/logic/tasks/toggle-favorite';

import { notifyFavoriteChange } from './notify-favorite-change';

const getYears = ({ premiered, ended }: Show): string | null => {
  const start = premiered?.slice(0, 4);
  const end = ended?.slice(0, 4);

  if (!start) return null;
  if (!end) return `${start}–present`;
  return start === end ? start : `${start}–${end}`;
};

export const useShowCard = (show: Show) => {
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
    summary: show.summary ?? 'No summary yet.',
    hasSummary: show.summary !== null,
    isFavorite,
    favoriteLabel: `Favorite ${show.name}`,
    onToggleFavorite: () => {
      void toggleFavorite(show).then((change) => notifyFavoriteChange(show, change));
    },
  };
};
