import { Injectable } from '@nestjs/common';
import type { Show } from '@tvmaze/contracts';

import { TvMazeClient } from '../tvmaze/tvmaze.client.js';

type FavoriteEntry = {
  show: Show;
  addedAt: number;
};

/** In-memory favorites keyed by show id. Lost on server restart. */
const favorite: Record<number, FavoriteEntry> = {};

@Injectable()
export class FavoritesService {
  constructor(private readonly tvmaze: TvMazeClient) {}

  /** Most recently added first. */
  list(): Show[] {
    return Object.values(favorite)
      .sort((a, b) => b.addedAt - a.addedAt)
      .map(({ show }) => show);
  }

  async add(showId: number): Promise<Show> {
    const existing = favorite[showId];
    if (existing) return existing.show;

    const show = await this.tvmaze.getShow(showId);
    favorite[showId] = { show, addedAt: Date.now() };
    return show;
  }

  remove(showId: number): void {
    delete favorite[showId];
  }
}
