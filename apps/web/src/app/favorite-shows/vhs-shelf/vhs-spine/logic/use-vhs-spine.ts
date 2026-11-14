import type { Show } from '@tvmaze/contracts';
import { useMemo } from 'react';

import { getSpineDesign } from './get-spine-design';

const STAGGER_MS = 40;
const MAX_STAGGER_MS = 600;

export const useVhsSpine = (show: Show, index: number) => {
  const design = useMemo(() => getSpineDesign(show), [show]);
  const year = show.premiered?.slice(0, 4) ?? null;
  const rating = show.rating.average;

  return {
    title: show.name,
    label: year ? `${show.name}, ${year}` : show.name,
    studio: show.type,
    year,
    rating: rating === null ? null : rating.toFixed(1),
    posterUrl: design.hasPosterStrip ? (show.image?.medium ?? null) : null,
    formatLabel: design.formatLabel,
    titleClassName: design.titleClassName,
    style: {
      ...design.style,
      animationDelay: `${Math.min(index * STAGGER_MS, MAX_STAGGER_MS)}ms`,
    },
  };
};
