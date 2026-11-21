import { useMemo, useState } from 'react';

import { loadFavorites } from '~/app/logic/tasks/load-favorites';
import { useFavoritesRoute } from '~/app/logic/use-favorites-route';
import {
  selectFavoriteShows,
  selectFavoritesStatus,
  useFavoritesStore,
} from '~/app/stores/favorites.store';

import { collectDecades, getDecade } from './get-decade';
import { useRetainedShows } from './use-retained-shows';

export type FavoriteShowsStatus = 'loading' | 'error' | 'empty' | 'list';

const pluralRules = new Intl.PluralRules('en-US');

export const useFavoriteShows = () => {
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
  const decade = requestedDecade && decades.includes(requestedDecade) ? requestedDecade : null;
  const visibleShows = useMemo(
    () => (decade ? shows.filter((show) => getDecade(show) === decade) : shows),
    [shows, decade],
  );
  const selectedShow =
    visibleShows.find((show) => show.id === requestedShowId) ?? visibleShows[0] ?? null;

  const getStatus = (): FavoriteShowsStatus => {
    if (loadStatus === 'idle' || loadStatus === 'loading') return 'loading';
    if (loadStatus === 'error') return 'error';
    return shows.length === 0 ? 'empty' : 'list';
  };

  const count = favoriteShows.length;

  return {
    status: getStatus(),
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
