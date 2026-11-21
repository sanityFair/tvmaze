import { HttpError } from '~/api/http-client';

export const describeSearchError = (error: Error): string => {
  if (!(error instanceof HttpError)) {
    return 'Couldn’t reach the server. Check your internet connection, then edit your search.';
  }

  if (error.status === 429) {
    return 'TVMaze is limiting requests right now. Wait a few seconds, then edit your search.';
  }
  if (error.status === 502) {
    return 'TVMaze is unavailable right now. Try again in a moment.';
  }
  if (error.status >= 500) {
    return 'The server ran into a problem. Make sure the API is running, then try again.';
  }
  return `${error.message}. Edit your search or try again later.`;
};
