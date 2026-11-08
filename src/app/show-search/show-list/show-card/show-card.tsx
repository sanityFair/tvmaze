import { StarIcon, TelevisionSimpleIcon } from '@phosphor-icons/react';

import type { TvMazeShow } from '~/api/tvmaze';
import { Badge } from '~/ui-kit/badge';

import { useShowCard } from './use-show-card';

type ShowCardProps = {
  show: TvMazeShow;
};

export const ShowCard = ({ show }: ShowCardProps) => {
  const card = useShowCard(show);

  return (
    <article className="group relative grid grid-cols-[5.5rem_1fr] gap-4 rounded-2xl border border-white/[0.07] bg-surface p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] transition-[translate,border-color,box-shadow] duration-300 ease-out focus-within:border-white/25 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-white/20 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_18px_40px_-20px_rgb(0_0_0/0.9)] sm:grid-cols-[8rem_1fr] sm:gap-6 sm:p-4">
      {card.posterUrl ? (
        <img
          src={card.posterUrl}
          alt=""
          loading="lazy"
          className="aspect-[2/3] w-full rounded-lg bg-white/5 object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex aspect-[2/3] w-full items-center justify-center rounded-lg border border-dashed border-white/10 text-white/25"
        >
          <TelevisionSimpleIcon className="size-8" />
        </div>
      )}

      <div className="flex min-w-0 flex-col gap-2.5 py-0.5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg leading-snug font-bold tracking-tight text-balance sm:text-xl">
            <a
              href={card.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {card.title}
              <span className="sr-only"> (opens on TVMaze in a new tab)</span>
            </a>
          </h2>
          {card.rating && (
            <p className="flex shrink-0 items-center gap-1 pt-1 text-sm tabular-nums">
              <StarIcon aria-hidden weight="fill" className="size-3.5 text-rating" />
              <span aria-hidden>{card.rating}</span>
              <span className="sr-only">{card.ratingLabel}</span>
            </p>
          )}
        </div>

        {card.years && <p className="text-xs text-muted-foreground">{card.years}</p>}

        {card.hasGenres && (
          <ul aria-label="Genres" className="flex flex-wrap gap-1.5">
            {card.genres.map((genre) => (
              <li key={genre}>
                <Badge variant="outline" className="border-white/10 text-muted-foreground">
                  {genre}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        <p
          className="line-clamp-3 text-sm/relaxed text-foreground/75 data-[empty=true]:text-muted-foreground data-[empty=true]:italic"
          data-empty={!card.hasSummary}
        >
          {card.summary}
        </p>
      </div>
    </article>
  );
};
