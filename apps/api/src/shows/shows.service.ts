import { Injectable } from '@nestjs/common';
import type { ShowsPage } from '@tvmaze/contracts';

import { TvMazeClient } from '../tvmaze/tvmaze.client.js';
import { collectGenres } from './logic/collect-genres.js';
import type { ShowsQuery } from './logic/parse-shows-query.js';
import { slicePage } from './logic/slice-page.js';

@Injectable()
export class ShowsService {
  constructor(private readonly tvmaze: TvMazeClient) {}

  async findPage({ q, genre, page, pageSize }: ShowsQuery): Promise<ShowsPage> {
    const shows = await this.tvmaze.searchShows(q);
    const filtered = genre ? shows.filter((show) => show.genres.includes(genre)) : shows;
    const slice = slicePage(filtered, page, pageSize);

    return {
      items: slice.items,
      page: slice.page,
      pageSize,
      totalPages: slice.totalPages,
      total: filtered.length,
      totalUnfiltered: shows.length,
      genres: collectGenres(shows),
      genre,
    };
  }
}
