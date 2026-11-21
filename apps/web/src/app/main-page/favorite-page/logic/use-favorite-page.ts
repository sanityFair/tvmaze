import { useMemo, useState } from 'react';

import { loadFavorites } from '~/app/main-page/logic/tasks/load-favorites';
import { useFavoritesRoute } from '~/app/main-page/logic/use-favorites-route';
import {
  type FavoritesStatus,
  selectFavoriteShows,
  selectFavoritesStatus,
  useFavoritesStore,
} from '~/app/main-page/stores/favorites.store';

import { collectDecades, getDecade } from './decades';
import { useRetainedShows } from './use-retained-shows';

export type FavoritePageStatus = 'loading' | 'error' | 'empty' | 'list';

const getFavoritePageStatus = (loadStatus: FavoritesStatus, count: number): FavoritePageStatus => {
  if (loadStatus === 'error') return 'error';
  if (loadStatus !== 'ready') return 'loading';
  return count === 0 ? 'empty' : 'list';
};

const pluralRules = new Intl.PluralRules('en-US');

export const useFavoritePage = () => {
  const favoritesRoute = useFavoritesRoute();
  const favoriteShows = useFavoritesStore(selectFavoriteShows);
  const loadStatus = useFavoritesStore(selectFavoritesStatus);
  const shows = useRetainedShows(favoriteShows);
  const [requestedDecade, setDecade] = useState<string | null>(null);
  const [requestedShowId, setSelectedShowId] = useState<number | null>(null);

  const removedShowIds = useMemo(() => {
    const favoriteIds = new Set(favoriteShows.map(({ id }) => id));
    return new Set(shows.filter(({ id }) => !favoriteIds.has(id)).map(({ id }) => id));
  }, [shows, favoriteShows]);
  const decades = useMemo(() => collectDecades(shows), [shows]);
  const isDecadeAvailable = requestedDecade !== null && decades.includes(requestedDecade);
  const decade = isDecadeAvailable ? requestedDecade : null;
  const visibleShows = useMemo(
    () => (decade ? shows.filter((show) => getDecade(show) === decade) : shows),
    [shows, decade],
  );
  const selectedShow =
    visibleShows.find((show) => show.id === requestedShowId) ?? visibleShows[0] ?? null;

  const count = favoriteShows.length;

  return {
    status: getFavoritePageStatus(loadStatus, shows.length),
    countLabel: `${count} ${pluralRules.select(count) === 'one' ? 'tape' : 'tapes'}`,
    decades,
    selectedDecade: decade,
    onDecadeChange: setDecade,
    shows: visibleShows,
    removedShowIds,
    selectedShow,
    onSelectShow: setSelectedShowId,
    onRetry: () => loadFavorites(),
    onBack: favoritesRoute.close,
  };
};
