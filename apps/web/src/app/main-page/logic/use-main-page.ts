import { useEffect } from 'react';

import { loadFavorites } from '~/app/main-page/logic/tasks/load-favorites';
import { selectSessionStatus, useSessionStore } from '~/app/stores/session.store';

/** Loads the user's favorites whenever a session starts: the header and every page use them. */
export const useMainPage = () => {
  const sessionStatus = useSessionStore(selectSessionStatus);

  useEffect(() => {
    if (sessionStatus === 'authenticated') void loadFavorites();
  }, [sessionStatus]);
};
