import { Navigate, Route, Routes } from 'react-router';

import { SessionGate } from '~/components/session-gate/session-gate';
import { FAVORITES_PATH, HOME_PATH } from '~/lib/paths';

import { FavoritePage } from './favorite-page/favorite-page';
import { useMainPage } from './logic/use-main-page';
import { MainHeader } from './main-header/main-header';
import { ShowSearchPage } from './show-search-page/show-search-page';

export const MainPage = () => {
  const page = useMainPage();

  return (
    <>
      <MainHeader
        isFavoritesOpen={page.isFavoritesOpen}
        onFavoritesOpenChange={page.onFavoritesOpenChange}
      />
      <Routes>
        <Route index element={<ShowSearchPage />} />
        <Route element={<SessionGate access="user" />}>
          <Route
            path={FAVORITES_PATH}
            element={
              <FavoritePage onBack={page.onCloseFavorites} onRetry={page.onRetryFavorites} />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={HOME_PATH} replace />} />
      </Routes>
    </>
  );
};
