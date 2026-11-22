export type LoginRequest = {
  email: string;
};

export type SessionUser = {
  email: string;
};

export type SessionResponse = {
  user: SessionUser;
};
