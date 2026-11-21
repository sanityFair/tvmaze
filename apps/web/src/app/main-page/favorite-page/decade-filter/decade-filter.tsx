import { ToggleGroup, ToggleGroupItem } from '~/ui-kit/toggle-group';

const ALL = '__all__';

const ITEM_CLASS =
  'h-7 rounded-none! border-0 border-l border-white/60 px-3 text-xs tracking-wider text-foreground uppercase first:border-l-0 hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-black';

type DecadeFilterProps = {
  decades: string[];
  value: string | null;
  onValueChange: (decade: string | null) => void;
};

export const DecadeFilter = ({ decades, value, onValueChange }: DecadeFilterProps) => (
  <ToggleGroup
    aria-label="Filter by decade"
    spacing={0}
    value={[value ?? ALL]}
    onValueChange={([next]) => onValueChange(next && next !== ALL ? next : null)}
    className="mx-auto w-fit max-w-full flex-wrap overflow-hidden rounded-md border border-white/60"
  >
    <ToggleGroupItem value={ALL} className={ITEM_CLASS}>
      All
    </ToggleGroupItem>
    {decades.map((decade) => (
      <ToggleGroupItem key={decade} value={decade} className={ITEM_CLASS}>
        {decade}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);
