import type { Show } from '@tvmaze/contracts';
import { useState } from 'react';

const mergeRetained = (retained: Show[], current: Show[]): Show[] => {
  const known = new Set(retained.map(({ id }) => id));
  const added = current.filter(({ id }) => !known.has(id));
  return added.length > 0 ? [...added, ...retained] : retained;
};

export const useRetainedShows = (shows: Show[]) => {
  const [retained, setRetained] = useState(shows);
  const [previousShows, setPreviousShows] = useState(shows);

  if (shows !== previousShows) {
    setPreviousShows(shows);
    setRetained(mergeRetained(retained, shows));
  }

  return retained;
};
