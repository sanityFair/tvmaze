import { decodeHTML } from 'entities';

const BLOCK_TAG = /<\/?(?:p|br|div|li|ul|ol|h[1-6])\b[^>]*>/gi;
const ANY_TAG = /<[^>]*>/g;

export const htmlToText = (html: string | null): string | null => {
  if (!html) return null;

  const withoutTags = html.replace(BLOCK_TAG, ' ').replace(ANY_TAG, '');
  const text = decodeHTML(withoutTags).replace(/\s+/g, ' ').trim();

  return text || null;
};
