import { Route, Routes } from 'react-router';

import { SessionGate } from '~/components/session-gate/session-gate';
import { LOGIN_PATH } from '~/lib/paths';
import { Toaster } from '~/ui-kit/toast';

import { BackdropSide } from './backdrop-side/backdrop-side';
import { useApp } from './logic/use-app';
import { LoginPage } from './login-page/login-page';
import { MainPage } from './main-page/main-page';

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
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </main>
      <BackdropSide side="right" />
      <Toaster />
    </div>
  );
};
