import { useMemo, useState } from 'react';

import { useFavoritesStore } from '~/app/logic/favorites.store';
import { loadFavorites } from '~/app/logic/tasks/load-favorites';

import { collectDecades, getDecade } from './get-decade';

export type FavoriteShowsStatus = 'loading' | 'error' | 'empty' | 'list';

const pluralRules = new Intl.PluralRules('en-US');

export const useFavoriteShows = () => {
  const shows = useFavoritesStore((state) => state.shows);
  const loadStatus = useFavoritesStore((state) => state.status);
  const [requestedDecade, setDecade] = useState<string | null>(null);
  const [requestedShowId, setSelectedShowId] = useState<number | null>(null);

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

  return {
    status: getStatus(),
    countLabel: `${shows.length} ${pluralRules.select(shows.length) === 'one' ? 'tape' : 'tapes'}`,
    decades,
    selectedDecade: decade,
    onDecadeChange: setDecade,
    shows: visibleShows,
    selectedShow,
    onSelectShow: setSelectedShowId,
    onRetry: () => loadFavorites(),
  };
};
