import { ToggleGroup, ToggleGroupItem } from '~/ui-kit/toggle-group';

import { ALL_GENRES, useGenreChips } from './logic/use-genre-chips';

const CHIP_CLASS =
  'h-8 rounded-full border-white/10 px-3.5 text-[0.8rem] text-muted-foreground transition-colors hover:border-white/25 hover:bg-transparent hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background';

export const GenreChips = () => {
  const chips = useGenreChips();

  if (!chips.isVisible) return null;

  return (
    <ToggleGroup
      aria-label="Filter by genre"
      variant="outline"
      value={chips.value}
      onValueChange={chips.onValueChange}
      className="w-full animate-fade flex-wrap"
    >
      <ToggleGroupItem value={ALL_GENRES} className={CHIP_CLASS}>
        All genres
      </ToggleGroupItem>
      {chips.genres.map((genre) => (
        <ToggleGroupItem key={genre} value={genre} className={CHIP_CLASS}>
          {genre}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
