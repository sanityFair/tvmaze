import { useShowSearchStore } from '../../stores/show-search.store';
import { loadShows } from './load-shows';

export const goToPage = async (nextPage: number): Promise<void> => {
  const { page, response, setPage } = useShowSearchStore.getState();
  const totalPages = response?.totalPages ?? 1;
  if (nextPage === page || nextPage < 1 || nextPage > totalPages) return;

  setPage(nextPage);
  const result = await loadShows();

  // Roll back to the page that is actually on screen, unless the user has moved on.
  const current = useShowSearchStore.getState();
  if (result === 'failed' && current.page === nextPage) {
    current.setPage(current.response?.page ?? 1);
  }
};

export const goToNextPage = (): Promise<void> => goToPage(useShowSearchStore.getState().page + 1);

export const goToPreviousPage = (): Promise<void> =>
  goToPage(useShowSearchStore.getState().page - 1);
