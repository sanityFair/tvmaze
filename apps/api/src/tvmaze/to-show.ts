import type { Show } from '@tvmaze/contracts';

import { htmlToText } from './html-to-text.js';
import type { TvMazeShow } from './tvmaze.types.js';

export const toShow = (show: TvMazeShow): Show => ({
  id: show.id,
  url: show.url,
  name: show.name,
  type: show.type,
  language: show.language,
  genres: show.genres,
  status: show.status,
  premiered: show.premiered,
  ended: show.ended,
  rating: { average: show.rating.average },
  image: show.image ? { medium: show.image.medium, original: show.image.original } : null,
  summary: htmlToText(show.summary),
});
