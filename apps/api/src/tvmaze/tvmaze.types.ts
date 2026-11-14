import type { Show } from '@tvmaze/contracts';

/** Raw show returned by TVMaze. Contains more fields than the app exposes. */
export type TvMazeShow = Show & Record<string, unknown>;

export type TvMazeSearchResult = {
  score: number;
  show: TvMazeShow;
};
