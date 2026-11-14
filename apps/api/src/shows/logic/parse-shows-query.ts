import { BadRequestException } from '@nestjs/common';

export type ShowsQuery = {
  q: string;
  genre: string | null;
  page: number;
  pageSize: number;
};

const MAX_QUERY_LENGTH = 100;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;
const MAX_PAGE = 1000;

type RawQuery = Record<string, unknown>;

const readString = (raw: RawQuery, key: string): string | undefined => {
  const value = raw[key];
  if (value === undefined) return undefined;
  if (typeof value !== 'string') throw new BadRequestException(`"${key}" must be a single value`);
  return value.trim();
};

const readPositiveInt = (raw: RawQuery, key: string, fallback: number, max: number): number => {
  const value = readString(raw, key);
  if (value === undefined || value === '') return fallback;

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > max) {
    throw new BadRequestException(`"${key}" must be an integer from 1 to ${max}`);
  }
  return parsed;
};

export const parseShowsQuery = (raw: RawQuery): ShowsQuery => {
  const q = readString(raw, 'q') ?? '';
  if (q === '') throw new BadRequestException('"q" is required');
  if (q.length > MAX_QUERY_LENGTH) {
    throw new BadRequestException(`"q" must be at most ${MAX_QUERY_LENGTH} characters`);
  }

  return {
    q,
    genre: readString(raw, 'genre') || null,
    page: readPositiveInt(raw, 'page', 1, MAX_PAGE),
    pageSize: readPositiveInt(raw, 'pageSize', DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE),
  };
};
