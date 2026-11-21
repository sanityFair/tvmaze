import type { IncomingMessage, ServerResponse } from 'node:http';

import { SESSION_TTL_MS } from './session-token.js';

const SESSION_COOKIE = 'tvmaze_session';

const serializeCookie = (value: string, maxAgeSeconds: number): string =>
  [
    `${SESSION_COOKIE}=${value}`,
    'Path=/api',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
    ...(process.env.NODE_ENV === 'production' ? ['Secure'] : []),
  ].join('; ');

export const readSessionCookie = (request: IncomingMessage): string | null => {
  for (const part of (request.headers.cookie ?? '').split(';')) {
    const [name, ...value] = part.trim().split('=');
    if (name === SESSION_COOKIE) return value.join('=');
  }
  return null;
};

export const writeSessionCookie = (response: ServerResponse, token: string): void => {
  response.setHeader('Set-Cookie', serializeCookie(token, SESSION_TTL_MS / 1000));
};

export const clearSessionCookie = (response: ServerResponse): void => {
  response.setHeader('Set-Cookie', serializeCookie('', 0));
};
