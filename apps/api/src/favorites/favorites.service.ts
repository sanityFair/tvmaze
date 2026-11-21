import { Injectable } from '@nestjs/common';
import type { Show } from '@tvmaze/contracts';

import { TvMazeClient } from '../tvmaze/tvmaze.client.js';

type FavoriteEntry = {
  show: Show;
  addedAt: number;
};

const favorites: Record<string, Record<number, FavoriteEntry>> = {};

const getUserFavorites = (email: string): Record<number, FavoriteEntry> =>
  (favorites[email] ??= {});

@Injectable()
export class FavoritesService {
  constructor(private readonly tvmaze: TvMazeClient) {}

  list(email: string): Show[] {
    return Object.values(favorites[email] ?? {})
      .sort((a, b) => b.addedAt - a.addedAt)
      .map(({ show }) => show);
  }

  async add(email: string, showId: number): Promise<Show> {
    const existing = favorites[email]?.[showId];
    if (existing) return existing.show;

    const show = await this.tvmaze.getShow(showId);
    getUserFavorites(email)[showId] = { show, addedAt: Date.now() };
    return show;
  }

  remove(email: string, showId: number): void {
    delete favorites[email]?.[showId];
  }
}
