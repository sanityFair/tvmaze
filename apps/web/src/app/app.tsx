import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui-kit/tabs';

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
        <Tabs defaultValue="search" className="gap-0">
          <header className="flex flex-wrap items-center justify-between gap-4 px-4 pt-8 pb-2 sm:px-8 sm:pt-10">
            <h1 className="w-fit animate-rgb-drift font-heading text-2xl font-bold tracking-wide text-white rgb-split hover:animate-rgb-glitch hover:rgb-split-strong motion-reduce:animate-none">
              TVMaze
            </h1>
            <TabsList variant="line" aria-label="Sections">
              <TabsTrigger value="search" className="px-3">
                Search
              </TabsTrigger>
              <TabsTrigger value="favorites" className="px-3 tabular-nums">
                {app.favoritesLabel}
              </TabsTrigger>
            </TabsList>
          </header>
          <TabsContent value="search" keepMounted className="text-base">
            <ShowSearch />
          </TabsContent>
          <TabsContent value="favorites" className="text-base">
            <FavoriteShows />
          </TabsContent>
        </Tabs>
      </main>
      <BackdropSide side="right" />
    </div>
  );
};
