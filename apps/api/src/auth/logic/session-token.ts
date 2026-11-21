import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const DEV_SECRET = 'tvmaze-dev-session-secret';

type SessionPayload = {
  email: string;
  exp: number;
};

const getSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be set in production');
  }
  return DEV_SECRET;
};

const sign = (data: string): string =>
  createHmac('sha256', getSecret()).update(data).digest('base64url');

const hasValidSignature = (data: string, signature: string): boolean => {
  const expected = Buffer.from(sign(data));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

const parsePayload = (data: string): Partial<SessionPayload> | null => {
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as Partial<SessionPayload>;
  } catch {
    return null;
  }
};

export const createSessionToken = (email: string, now = Date.now()): string => {
  const payload: SessionPayload = { email, exp: now + SESSION_TTL_MS };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${data}.${sign(data)}`;
};

export const readSessionToken = (token: string, now = Date.now()): string | null => {
  const [data, signature, ...rest] = token.split('.');
  if (!data || !signature || rest.length > 0) return null;
  if (!hasValidSignature(data, signature)) return null;

  const payload = parsePayload(data);
  if (typeof payload?.email !== 'string' || typeof payload.exp !== 'number') return null;
  return payload.exp > now ? payload.email : null;
};
