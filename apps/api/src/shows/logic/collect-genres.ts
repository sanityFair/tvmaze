import type { Show } from '@tvmaze/contracts';

export const collectGenres = (shows: Show[]): string[] => {
  const genres = new Set(shows.flatMap((show) => show.genres));
  return [...genres].sort((a, b) => a.localeCompare(b));
};
