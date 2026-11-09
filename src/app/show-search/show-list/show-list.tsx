import type { TvMazeShow } from '~/api/tvmaze';

import { ShowCard } from './show-card/show-card';

type ShowListProps = {
  shows: TvMazeShow[];
  summary: string;
  isUpdating: boolean;
};

export const ShowList = ({ shows, summary, isUpdating }: ShowListProps) => (
  <section aria-label="Search results" aria-busy={isUpdating} className="flex flex-col gap-4">
    <output className="text-sm text-muted-foreground">{summary}</output>
    <ul
      className="flex flex-col gap-4 transition-opacity duration-200 data-[updating=true]:opacity-60 [&>li]:animate-rise [&>li:nth-child(2)]:[animation-delay:70ms] [&>li:nth-child(3)]:[animation-delay:140ms]"
      data-updating={isUpdating}
    >
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  </section>
);
