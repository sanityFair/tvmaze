import { HttpError } from '~/api/http-client';

export const describeSearchError = (error: Error): string => {
  if (error instanceof HttpError) {
    return error.status === 429
      ? 'TVMaze is limiting requests right now. Wait a few seconds, then edit your search.'
      : `TVMaze responded with error ${error.status}. Edit your search or try again later.`;
  }

  return 'Couldn’t reach TVMaze. Check your internet connection, then edit your search.';
};
