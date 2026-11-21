import { HeartIcon } from '@phosphor-icons/react';
import { Outlet } from 'react-router';

import { Toggle } from '~/ui-kit/toggle';

import { useMainLayout } from './logic/use-main-layout';
import { UserMenu } from './user-menu/user-menu';

export const MainLayout = () => {
  const layout = useMainLayout();

  return (
    <>
      <header className="flex items-center justify-between gap-4 px-4 pt-8 pb-2 sm:px-8 sm:pt-10">
        <h1 className="w-fit animate-rgb-drift font-heading text-2xl font-bold tracking-wide text-white rgb-split hover:animate-rgb-glitch hover:rgb-split-strong motion-reduce:animate-none">
          TVMaze
        </h1>
        <div className="flex min-w-0 items-center gap-2">
          <UserMenu />
          <Toggle
            aria-label={layout.favoritesLabel}
            pressed={layout.isFavoritesOpen}
            onPressedChange={layout.onFavoritesOpenChange}
            className="h-10 shrink-0 gap-2 rounded-full bg-white/5 px-4 text-sm tabular-nums hover:bg-white/10 aria-pressed:bg-white/15"
          >
            <HeartIcon
              aria-hidden
              weight={layout.isFavoritesOpen ? 'fill' : 'regular'}
              className="size-4 text-destructive"
            />
            <span aria-hidden>{layout.favoritesCount}</span>
          </Toggle>
        </div>
      </header>
      <Outlet />
    </>
  );
};
