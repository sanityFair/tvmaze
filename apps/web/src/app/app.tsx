import { HeartIcon } from '@phosphor-icons/react';

import { Toaster } from '~/ui-kit/toast';
import { Toggle } from '~/ui-kit/toggle';

import { BackdropSide } from './backdrop-side/backdrop-side';
import { FavoriteShows } from './favorite-shows/favorite-shows';
import { useApp } from './logic/use-app';
import { ShowSearch } from './show-search/show-search';

export const App = () => {
  const app = useApp();

  return (
    <div className="min-h-dvh bg-background md:grid md:grid-cols-[1fr_minmax(0,46rem)_1fr]">
      <BackdropSide side="left" />
      <main className="relative z-10 min-h-dvh min-w-0 bg-background md:shadow-[0_0_80px_24px_#0a0a0a]">
        <header className="flex items-center justify-between gap-4 px-4 pt-8 pb-2 sm:px-8 sm:pt-10">
          <h1 className="w-fit animate-rgb-drift font-heading text-2xl font-bold tracking-wide text-white rgb-split hover:animate-rgb-glitch hover:rgb-split-strong motion-reduce:animate-none">
            TVMaze
          </h1>
          <Toggle
            aria-label={app.favoritesLabel}
            pressed={app.isFavoritesOpen}
            onPressedChange={app.onFavoritesOpenChange}
            className="h-10 gap-2 rounded-full bg-white/5 px-4 text-sm tabular-nums hover:bg-white/10 aria-pressed:bg-white/15"
          >
            <HeartIcon
              aria-hidden
              weight={app.isFavoritesOpen ? 'fill' : 'regular'}
              className="size-4 text-destructive"
            />
            <span aria-hidden>{app.favoritesCount}</span>
          </Toggle>
        </header>
        <div hidden={app.isFavoritesOpen}>
          <ShowSearch />
        </div>
        {app.isFavoritesOpen && <FavoriteShows />}
      </main>
      <BackdropSide side="right" />
      <Toaster />
    </div>
  );
};
