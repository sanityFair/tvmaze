export const ALL_GENRES = '__all__';

type UseGenreChipsOptions = {
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
};

export const useGenreChips = ({ selectedGenre, onGenreChange }: UseGenreChipsOptions) => {
  const handleValueChange = (values: string[]) => {
    const [next] = values;
    onGenreChange(next && next !== ALL_GENRES ? next : null);
  };

  return {
    value: [selectedGenre ?? ALL_GENRES],
    onValueChange: handleValueChange,
  };
};
