import { useFavoritesRoute } from '~/app/main-page/logic/use-favorites-route';
import { useSignInRoute } from '~/app/main-page/logic/use-sign-in-route';
import { selectFavoritesCount, useFavoritesStore } from '~/app/main-page/stores/favorites.store';
import { selectSessionStatus, useSessionStore } from '~/app/stores/session.store';

const pluralRules = new Intl.PluralRules('en-US');

export const useMainHeader = () => {
  const favoritesRoute = useFavoritesRoute();
  const openSignIn = useSignInRoute();
  const sessionStatus = useSessionStore(selectSessionStatus);
  const favoritesCount = useFavoritesStore(selectFavoritesCount);

  return {
    sessionStatus,
    onSignIn: openSignIn,
    isFavoritesOpen: favoritesRoute.isOpen,
    onFavoritesOpenChange: (open: boolean) =>
      open ? favoritesRoute.open() : favoritesRoute.close(),
    favoritesCount,
    favoritesLabel: `Favorites, ${favoritesCount} ${pluralRules.select(favoritesCount) === 'one' ? 'show' : 'shows'}`,
  };
};
