import { useEffect, useState } from 'react';

const FAVORITES_HASH = '#favorites';

type HistoryState = { view?: string } | null;

const isFavoritesLocation = () => window.location.hash === FAVORITES_HASH;

/** Keeps the favorites view in the URL so the browser Back button and deep links work. */
export const useFavoritesRoute = () => {
  const [isOpen, setOpen] = useState(isFavoritesLocation);

  useEffect(() => {
    const sync = () => setOpen(isFavoritesLocation());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = () => {
    if (isFavoritesLocation()) return;
    window.history.pushState({ view: 'favorites' }, '', FAVORITES_HASH);
    setOpen(true);
  };

  const close = () => {
    if (!isFavoritesLocation()) return;
    // We pushed this entry ourselves: going back keeps the history clean (popstate syncs state).
    if ((window.history.state as HistoryState)?.view === 'favorites') {
      window.history.back();
      return;
    }
    const { pathname, search } = window.location;
    window.history.replaceState(null, '', pathname + search);
    setOpen(false);
  };

  return { isOpen, open, close };
};
