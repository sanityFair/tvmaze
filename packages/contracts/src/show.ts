export type ShowImage = {
  medium: string;
  original: string;
};

export type Show = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  premiered: string | null;
  ended: string | null;
  rating: { average: number | null };
  image: ShowImage | null;
  summary: string | null;
};
