export const SEARCH_SHOWS_PATH = '/search/shows';

export type TvMazeImage = {
  medium: string;
  original: string;
};

export type TvMazeRating = {
  average: number | null;
};

export type TvMazeShow = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  premiered: string | null;
  ended: string | null;
  rating: TvMazeRating;
  image: TvMazeImage | null;
  summary: string | null;
};

export type TvMazeSearchResult = {
  score: number;
  show: TvMazeShow;
};
