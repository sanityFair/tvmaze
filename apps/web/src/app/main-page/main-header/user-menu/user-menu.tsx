import { SignOutIcon, UserCircleIcon } from '@phosphor-icons/react';

import { Button } from '~/ui-kit/button';

import { useUserMenu } from './logic/use-user-menu';

export const UserMenu = () => {
  const menu = useUserMenu();

  return (
    <div className="flex min-w-0 items-center gap-1 rounded-full bg-white/5 py-1 pr-1 pl-3">
      <UserCircleIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
      <span
        title={menu.email}
        className="max-w-[9rem] truncate text-xs text-muted-foreground sm:max-w-[16rem]"
      >
        <span className="sr-only">Signed in as </span>
        {menu.email}
      </span>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Log out"
        title="Log out"
        disabled={menu.isLoggingOut}
        onClick={menu.onLogOut}
        className="shrink-0 rounded-full"
      >
        <SignOutIcon aria-hidden />
      </Button>
    </div>
  );
};
