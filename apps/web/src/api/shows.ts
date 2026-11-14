import type { ShowsPage, ShowsPageQuery } from '@tvmaze/contracts';

import { apiRequest } from './http-client';

export const fetchShowsPage = (query: ShowsPageQuery, signal?: AbortSignal): Promise<ShowsPage> =>
  apiRequest<ShowsPage>('/shows', { query, signal });
