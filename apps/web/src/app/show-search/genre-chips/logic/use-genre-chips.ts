import { selectGenre } from '../../logic/tasks/select-genre';
import { useResultsPage } from '../../logic/use-results-page';
import { useSearchStatus } from '../../logic/use-search-status';

export const ALL_GENRES = '__all__';

export const useGenreChips = () => {
  const { status } = useSearchStatus();
  const { genres, selectedGenre } = useResultsPage();

  const handleValueChange = (values: string[]) => {
    const [next] = values;
    void selectGenre(next && next !== ALL_GENRES ? next : null);
  };

  return {
    isVisible: status === 'results' && genres.length > 0,
    genres,
    value: [selectedGenre ?? ALL_GENRES],
    onValueChange: handleValueChange,
  };
};
