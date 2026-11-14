import { useShowSearchStore } from '../../logic/show-search.store';
import { useResultsPage } from '../../logic/use-results-page';
import { useSearchStatus } from '../../logic/use-search-status';

export const ALL_GENRES = '__all__';

export const useGenreChips = () => {
  const { status } = useSearchStatus();
  const { genres, selectedGenre } = useResultsPage();
  const selectGenre = useShowSearchStore((state) => state.selectGenre);

  const handleValueChange = (values: string[]) => {
    const [next] = values;
    selectGenre(next && next !== ALL_GENRES ? next : null);
  };

  return {
    isVisible: status === 'results' && genres.length > 0,
    genres,
    value: [selectedGenre ?? ALL_GENRES],
    onValueChange: handleValueChange,
  };
};
