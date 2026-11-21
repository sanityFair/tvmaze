import { Navigate, Route, Routes } from 'react-router';

import { SessionGate } from '~/app/components/session-gate/session-gate';
import { FAVORITES_PATH, HOME_PATH } from '~/app/logic/paths';

import { FavoritePage } from './favorite-page/favorite-page';
import { useMainPage } from './logic/use-main-page';
import { MainHeader } from './main-header/main-header';
import { ShowSearchPage } from './show-search-page/show-search-page';

export const MainPage = () => {
  useMainPage();

  return (
    <>
      <MainHeader />
      <Routes>
        <Route index element={<ShowSearchPage />} />
        <Route element={<SessionGate access="user" />}>
          <Route path={FAVORITES_PATH} element={<FavoritePage />} />
        </Route>
        <Route path="*" element={<Navigate to={HOME_PATH} replace />} />
      </Routes>
    </>
  );
};
