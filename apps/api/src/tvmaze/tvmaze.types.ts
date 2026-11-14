import type { Show } from '@tvmaze/contracts';

export type TvMazeShow = Show & Record<string, unknown>;

export type TvMazeSearchResult = {
  score: number;
  show: TvMazeShow;
};
