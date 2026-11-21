import type { Show } from '@tvmaze/contracts';

export const getDecade = ({ premiered }: Show): string | null => {
  const year = Number(premiered?.slice(0, 4));
  return Number.isInteger(year) && year > 0 ? `${Math.floor(year / 10) * 10}s` : null;
};

export const collectDecades = (shows: Show[]): string[] => {
  const decades = new Set(shows.map(getDecade).filter((decade) => decade !== null));
  return [...decades].sort();
};
