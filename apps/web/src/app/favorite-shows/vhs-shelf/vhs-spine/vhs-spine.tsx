import type { Show } from '@tvmaze/contracts';

import { cn } from '~/lib/utils';

import { useVhsSpine } from './logic/use-vhs-spine';

type VhsSpineProps = {
  show: Show;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
};

export const VhsSpine = ({ show, index, isSelected, onSelect }: VhsSpineProps) => {
  const spine = useVhsSpine(show, index);

  return (
    <button
      type="button"
      aria-label={spine.label}
      aria-pressed={isSelected}
      onClick={onSelect}
      style={spine.style}
      className="relative flex h-72 w-12 shrink-0 animate-rise snap-start flex-col items-center gap-2 overflow-hidden rounded-[3px] py-2 shadow-[0_12px_20px_-10px_rgb(0_0_0/0.95)] outline-none vhs-spine transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1.5 focus-visible:ring-3 focus-visible:ring-ring aria-pressed:-translate-y-4 aria-pressed:shadow-[0_0_0_2px_rgb(255_255_255/0.85),0_24px_30px_-12px_rgb(0_0_0/0.95)] sm:h-80 sm:w-14"
    >
      <span
        aria-hidden
        className="w-full truncate px-1 text-center text-[0.5rem] font-bold tracking-wider text-(--spine-accent) uppercase"
      >
        {spine.studio}
      </span>

      {spine.posterUrl && (
        <img
          src={spine.posterUrl}
          alt=""
          loading="lazy"
          className="h-16 w-full shrink-0 object-cover contrast-125 grayscale-[35%]"
        />
      )}

      <span
        aria-hidden
        className={cn(
          'min-h-0 flex-1 truncate leading-none tracking-tight vhs-vertical',
          spine.titleClassName,
        )}
      >
        {spine.title}
      </span>

      <span aria-hidden className="flex flex-col items-center gap-1.5">
        {spine.year && <span className="text-[0.55rem] tabular-nums opacity-80">{spine.year}</span>}
        {spine.rating && (
          <span className="flex size-6 items-center justify-center rounded-full bg-(--spine-accent) text-[0.55rem] font-bold text-(--spine-bg) tabular-nums">
            {spine.rating}
          </span>
        )}
        <span className="border border-current px-1 text-[0.55rem] font-black italic">
          {spine.formatLabel}
        </span>
      </span>
    </button>
  );
};
