import { Navigate, Route, Routes } from 'react-router';

import { Toaster } from '~/ui-kit/toast';

import { BackdropSide } from './backdrop-side/backdrop-side';
import { FavoriteShows } from './favorite-shows/favorite-shows';
import { FAVORITES_PATH, LOGIN_PATH } from './logic/paths';
import { useApp } from './logic/use-app';
import { LoginPage } from './login-page/login-page';
import { MainLayout } from './main-layout/main-layout';
import { SessionGate } from './session-gate/session-gate';
import { ShowSearch } from './show-search/show-search';

export const App = () => {
  useApp();

  return (
    <div className="min-h-dvh bg-background md:grid md:grid-cols-[1fr_minmax(0,46rem)_1fr]">
      <BackdropSide side="left" />
      <main className="relative z-10 min-h-dvh min-w-0 bg-background md:shadow-[0_0_80px_24px_#0a0a0a]">
        <Routes>
          <Route element={<SessionGate access="guest" />}>
            <Route path={LOGIN_PATH} element={<LoginPage />} />
          </Route>
          <Route element={<SessionGate access="user" />}>
            <Route element={<MainLayout />}>
              <Route index element={<ShowSearch />} />
              <Route path={FAVORITES_PATH} element={<FavoriteShows />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BackdropSide side="right" />
      <Toaster />
    </div>
  );
};
