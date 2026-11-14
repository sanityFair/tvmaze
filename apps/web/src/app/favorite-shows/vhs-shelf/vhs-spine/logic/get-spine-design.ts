import type { Show } from '@tvmaze/contracts';
import type { CSSProperties } from 'react';

type Palette = { bg: string; ink: string; accent: string };

const PALETTES: Palette[] = [
  { bg: '#d6c9a8', ink: '#1d5e46', accent: '#c8102e' },
  { bg: '#1f2f8c', ink: '#f1f1ee', accent: '#f1f1ee' },
  { bg: '#121212', ink: '#e8342b', accent: '#f1f1ee' },
  { bg: '#141414', ink: '#e8c34a', accent: '#f1f1ee' },
  { bg: '#3b2fb5', ink: '#ff6b3d', accent: '#ffd23f' },
  { bg: '#c8c8c2', ink: '#151515', accent: '#b0182a' },
  { bg: '#0f3b2d', ink: '#7eecb6', accent: '#f1f1ee' },
];

const TITLE_FONTS = ['font-heading font-bold uppercase', 'font-serif', 'font-sans italic'] as const;
const FORMAT_LABELS = ['VHS', 'HI-FI', 'STEREO', 'SP', 'VIDEO'];

const hash = (id: number, salt: number): number =>
  (Math.imul(id + salt * 977, 2654435761) >>> 0) % 1000;

const getTitleSize = (title: string): string => {
  if (title.length <= 10) return 'text-2xl sm:text-3xl';
  if (title.length <= 18) return 'text-xl sm:text-2xl';
  return 'text-base sm:text-lg';
};

export type SpineDesign = {
  style: CSSProperties;
  titleClassName: string;
  formatLabel: string;
  hasPosterStrip: boolean;
};

export const getSpineDesign = (show: Show): SpineDesign => {
  const palette = PALETTES[hash(show.id, 1) % PALETTES.length];
  const font = TITLE_FONTS[hash(show.id, 2) % TITLE_FONTS.length];

  return {
    style: {
      '--spine-bg': palette.bg,
      '--spine-ink': palette.ink,
      '--spine-accent': palette.accent,
      '--wear-x': `${20 + (hash(show.id, 3) % 60)}%`,
      '--wear-y': `${10 + (hash(show.id, 4) % 45)}%`,
    } as CSSProperties,
    titleClassName: `${font} ${getTitleSize(show.name)}`,
    formatLabel: FORMAT_LABELS[hash(show.id, 5) % FORMAT_LABELS.length],
    hasPosterStrip: show.image !== null && hash(show.id, 6) % 3 === 0,
  };
};
