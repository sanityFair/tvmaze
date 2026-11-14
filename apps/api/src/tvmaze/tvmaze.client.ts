import { Injectable, Logger } from '@nestjs/common';
import type { Show } from '@tvmaze/contracts';

import { fetchTvMazeJson } from './fetch-tvmaze-json.js';
import { toShow } from './to-show.js';
import { readCache, writeCache } from './tvmaze.cache.js';
import type { TvMazeSearchResult, TvMazeShow } from './tvmaze.types.js';

const DEFAULT_BASE_URL = 'https://api.tvmaze.com';

@Injectable()
export class TvMazeClient {
  private readonly logger = new Logger(TvMazeClient.name);
  private readonly baseUrl = process.env.TVMAZE_BASE_URL ?? DEFAULT_BASE_URL;

  async searchShows(query: string): Promise<Show[]> {
    const q = query.trim().toLowerCase();
    const results = await this.get<TvMazeSearchResult[]>('/search/shows', { q });
    return results.map(({ show }) => toShow(show));
  }

  async getShow(id: number): Promise<Show> {
    return toShow(await this.get<TvMazeShow>(`/shows/${id}`));
  }

  /** GET with a 5-minute cache: identical requests within the TTL don't reach TVMaze. */
  private async get<T>(path: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(path, this.baseUrl);
    url.search = new URLSearchParams(Object.entries(params).sort()).toString();
    const key = `${url.pathname}${url.search}`;

    const cached = readCache<T>(key);
    if (cached !== undefined) {
      this.logger.log(`cache hit ${key}`);
      return cached;
    }

    this.logger.log(`cache miss ${key} → TVMaze`);
    const data = await fetchTvMazeJson<T>(url);
    writeCache(key, data);
    return data;
  }
}
