import type { SearchFailure } from './tasks/search-shows';

export const describeSearchFailure = (failure: SearchFailure): string => {
  switch (failure.reason) {
    case 'offline':
      return 'Couldn’t reach the server. Check your internet connection, then edit your search.';
    case 'rate-limited':
      return 'TVMaze is limiting requests right now. Wait a few seconds, then edit your search.';
    case 'unavailable':
      return 'TVMaze is unavailable right now. Try again in a moment.';
    case 'server-error':
      return 'The server ran into a problem. Make sure the API is running, then try again.';
    case 'rejected':
      return `${failure.message}. Edit your search or try again later.`;
  }
};
