import { BadRequestException } from '@nestjs/common';

const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates the login body and normalizes the email, so one person always gets one list. */
export const parseEmail = (body: unknown): string => {
  const raw = (body as { email?: unknown } | null)?.email;
  if (typeof raw !== 'string') throw new BadRequestException('"email" is required');

  const email = raw.trim().toLowerCase();
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    throw new BadRequestException('Enter a valid email address');
  }
  return email;
};
