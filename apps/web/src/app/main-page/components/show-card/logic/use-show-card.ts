import type { Show } from '@tvmaze/contracts';

import { toggleFavorite } from '~/app/main-page/logic/tasks/toggle-favorite';
import { useSignInRoute } from '~/app/main-page/logic/use-sign-in-route';
import { selectIsFavorite, useFavoritesStore } from '~/app/main-page/stores/favorites.store';

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
  const openSignIn = useSignInRoute();
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
      toggleFavorite(show).then((result) => {
        if (result === 'sign-in-required') openSignIn();
        else notifyFavoriteChange(show, result);
      });
    },
  };
};
