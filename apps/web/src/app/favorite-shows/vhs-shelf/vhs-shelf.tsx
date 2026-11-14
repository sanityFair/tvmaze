import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import type { Show } from '@tvmaze/contracts';

import { Button } from '~/ui-kit/button';

import { useVhsShelf } from './logic/use-vhs-shelf';
import { VhsSpine } from './vhs-spine/vhs-spine';

type VhsShelfProps = {
  shows: Show[];
  selectedShowId: number | null;
  onSelectShow: (showId: number) => void;
};

export const VhsShelf = ({ shows, selectedShowId, onSelectShow }: VhsShelfProps) => {
  const { shelfRef, ...shelf } = useVhsShelf(shows.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <ul
          ref={shelfRef}
          onScroll={shelf.onScroll}
          aria-label="Favorite shows"
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pt-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shows.map((show, index) => (
            <li key={show.id} className="flex">
              <VhsSpine
                show={show}
                index={index}
                isSelected={show.id === selectedShowId}
                onSelect={() => onSelectShow(show.id)}
              />
            </li>
          ))}
        </ul>
        <div
          aria-hidden
          className="h-2.5 rounded-[2px] bg-linear-to-b from-[#3a3a3a] to-[#161616] shadow-[0_10px_24px_-6px_rgb(0_0_0/0.9)]"
        />
      </div>

      {shelf.hasOverflow && (
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Scroll shelf left"
            disabled={!shelf.canScrollPrevious}
            onClick={shelf.scrollPrevious}
          >
            <ArrowLeftIcon aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Scroll shelf right"
            disabled={!shelf.canScrollNext}
            onClick={shelf.scrollNext}
          >
            <ArrowRightIcon aria-hidden />
          </Button>
        </div>
      )}
    </div>
  );
};
