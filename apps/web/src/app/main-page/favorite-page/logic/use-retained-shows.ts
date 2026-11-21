import type { Show } from '@tvmaze/contracts';
import { useState } from 'react';

const mergeRetained = (retained: Show[], current: Show[]): Show[] => {
  const known = new Set(retained.map(({ id }) => id));
  const added = current.filter(({ id }) => !known.has(id));
  return added.length > 0 ? [...added, ...retained] : retained;
};

/**
 * Keeps every show that was a favorite while this view is mounted, so a show
 * unfavorited by mistake stays on the shelf and can be favorited again.
 */
export const useRetainedShows = (shows: Show[]) => {
  const [retained, setRetained] = useState(shows);
  const [previousShows, setPreviousShows] = useState(shows);

  if (shows !== previousShows) {
    setPreviousShows(shows);
    setRetained(mergeRetained(retained, shows));
  }

  return retained;
};
