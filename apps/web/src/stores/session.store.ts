import type { SessionUser } from '@tvmaze/contracts';
import { create } from 'zustand';

export type SessionStatus = 'unknown' | 'authenticated' | 'anonymous';

type SessionState = {
  status: SessionStatus;
  user: SessionUser | null;
};

type SessionActions = {
  signIn: (session: { user: SessionUser }) => void;
  signOut: () => void;
};

export const useSessionStore = create<SessionState & SessionActions>()((set) => ({
  status: 'unknown',
  user: null,
  signIn: ({ user }) => set({ status: 'authenticated', user }),
  signOut: () => set({ status: 'anonymous', user: null }),
}));

export const selectSessionStatus = (state: SessionState) => state.status;
export const selectUserEmail = (state: SessionState) => state.user?.email ?? null;
