import { useSignInRoute } from '~/hooks/use-sign-in-route';
import { selectSessionStatus, useSessionStore } from '~/stores/session.store';

import { selectFavoritesCount, useFavoritesStore } from '../../stores/favorites.store';

const pluralRules = new Intl.PluralRules('en-US');

export const useMainHeader = () => {
  const openSignIn = useSignInRoute();
  const sessionStatus = useSessionStore(selectSessionStatus);
  const favoritesCount = useFavoritesStore(selectFavoritesCount);
  const showsWord = pluralRules.select(favoritesCount) === 'one' ? 'show' : 'shows';

  return {
    sessionStatus,
    onSignIn: openSignIn,
    favoritesCount,
    favoritesLabel: `Favorites, ${favoritesCount} ${showsWord}`,
  };
};
