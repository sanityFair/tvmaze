import type { TvMazeShow } from '~/api/tvmaze';

export const collectGenres = (shows: TvMazeShow[]): string[] => {
  const genres = new Set(shows.flatMap((show) => show.genres));
  return [...genres].sort((a, b) => a.localeCompare(b));
};
