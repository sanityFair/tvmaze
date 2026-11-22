import { HeartIcon, SignInIcon } from '@phosphor-icons/react';

import { Button } from '~/ui-kit/button';
import { Toggle } from '~/ui-kit/toggle';

import { useMainHeader } from './logic/use-main-header';
import { UserMenu } from './user-menu/user-menu';

type MainHeaderProps = {
  isFavoritesOpen: boolean;
  onFavoritesOpenChange: (open: boolean) => void;
};

export const MainHeader = ({ isFavoritesOpen, onFavoritesOpenChange }: MainHeaderProps) => {
  const header = useMainHeader();

  return (
    <header className="flex min-h-18 items-center justify-between gap-4 px-4 pt-8 pb-2 sm:px-8 sm:pt-10">
      <h1 className="w-fit animate-rgb-drift font-heading text-2xl font-bold tracking-wide text-white rgb-split hover:animate-rgb-glitch hover:rgb-split-strong motion-reduce:animate-none">
        TVMaze
      </h1>
      {header.sessionStatus === 'anonymous' && (
        <Button
          variant="ghost"
          onClick={header.onSignIn}
          className="h-10 gap-2 rounded-full bg-white/5 px-4 hover:bg-white/10"
        >
          <SignInIcon aria-hidden />
          Sign in
        </Button>
      )}
      {header.sessionStatus === 'authenticated' && (
        <div className="flex min-w-0 animate-fade items-center gap-2">
          <UserMenu />
          <Toggle
            aria-label={header.favoritesLabel}
            pressed={isFavoritesOpen}
            onPressedChange={onFavoritesOpenChange}
            className="h-10 shrink-0 gap-2 rounded-full bg-white/5 px-4 text-sm tabular-nums hover:bg-white/10 aria-pressed:bg-white/15"
          >
            <HeartIcon
              aria-hidden
              weight={isFavoritesOpen ? 'fill' : 'regular'}
              className="size-4 text-destructive"
            />
            <span aria-hidden>{header.favoritesCount}</span>
          </Toggle>
        </div>
      )}
    </header>
  );
};
