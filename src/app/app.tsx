import { BackdropSide } from './backdrop-side/backdrop-side';
import { ShowSearch } from './show-search/show-search';

export const App = () => (
  <div className="min-h-dvh bg-background md:grid md:grid-cols-[1fr_minmax(0,46rem)_1fr]">
    <BackdropSide side="left" />
    <main className="relative z-10 min-h-dvh min-w-0 bg-background md:shadow-[0_0_80px_24px_#0a0a0a]">
      <header className="px-4 pt-8 pb-2 sm:px-8 sm:pt-10">
        <h1 className="w-fit animate-rgb-drift font-heading text-2xl font-bold tracking-wide text-white rgb-split hover:animate-rgb-glitch hover:rgb-split-strong motion-reduce:animate-none">
          TVMaze
        </h1>
      </header>
      <ShowSearch />
    </main>
    <BackdropSide side="right" />
  </div>
);
