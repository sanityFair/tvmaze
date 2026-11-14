import { useShowList } from './logic/use-show-list';
import { ShowCard } from './show-card/show-card';

export const ShowList = () => {
  const list = useShowList();

  if (!list.isVisible) return null;

  return (
    <section
      aria-label="Search results"
      aria-busy={list.isUpdating}
      className="flex flex-col gap-4"
    >
      <output className="text-sm text-muted-foreground">{list.summary}</output>
      <ul
        className="flex flex-col gap-4 transition-opacity duration-200 data-[updating=true]:opacity-60 [&>li]:animate-rise [&>li:nth-child(2)]:[animation-delay:70ms] [&>li:nth-child(3)]:[animation-delay:140ms]"
        data-updating={list.isUpdating}
      >
        {list.shows.map((show) => (
          <li key={show.id}>
            <ShowCard show={show} />
          </li>
        ))}
      </ul>
    </section>
  );
};
