import { ToggleGroup, ToggleGroupItem } from '~/ui-kit/toggle-group';

const ALL = '__all__';

const toSelection = (value: string | undefined): string | null =>
  value === undefined || value === ALL ? null : value;

const CHIP_CLASS =
  'h-8 rounded-full border-white/10 px-3.5 text-[0.8rem] text-muted-foreground transition-colors hover:border-white/25 hover:bg-transparent hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background';

type GenreChipsProps = {
  genres: string[];
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
};

export const GenreChips = ({ genres, selectedGenre, onGenreChange }: GenreChipsProps) => (
  <ToggleGroup
    aria-label="Filter by genre"
    variant="outline"
    value={[selectedGenre ?? ALL]}
    onValueChange={([next]) => onGenreChange(toSelection(next))}
    className="w-full animate-fade flex-wrap"
  >
    <ToggleGroupItem value={ALL} className={CHIP_CLASS}>
      All genres
    </ToggleGroupItem>
    {genres.map((genre) => (
      <ToggleGroupItem key={genre} value={genre} className={CHIP_CLASS}>
        {genre}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);
