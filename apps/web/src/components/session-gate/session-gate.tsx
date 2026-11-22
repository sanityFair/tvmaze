import { Navigate, Outlet } from 'react-router';

import { Spinner } from '~/ui-kit/spinner';

import { type SessionAccess, useSessionGate } from './logic/use-session-gate';

type SessionGateProps = {
  access: SessionAccess;
};

export const SessionGate = ({ access }: SessionGateProps) => {
  const gate = useSessionGate(access);

  if (gate.kind === 'pending') {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner aria-label="Checking session" className="size-6 text-muted-foreground" />
      </div>
    );
  }
  if (gate.kind === 'redirect') return <Navigate to={gate.to} state={gate.state} replace />;
  return <Outlet />;
};
