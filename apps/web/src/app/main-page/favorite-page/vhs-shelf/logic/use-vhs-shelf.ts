import { useCallback, useEffect, useRef, useState } from 'react';

const SCROLL_RATIO = 0.8;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useVhsShelf = (itemCount: number) => {
  const shelfRef = useRef<HTMLUListElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    setCanScrollPrevious(shelf.scrollLeft > 1);
    setCanScrollNext(shelf.scrollLeft + shelf.clientWidth < shelf.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState, itemCount]);

  const scrollBy = (direction: 1 | -1) => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    shelf.scrollBy({
      left: direction * shelf.clientWidth * SCROLL_RATIO,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return {
    shelfRef,
    onScroll: updateScrollState,
    canScrollPrevious,
    canScrollNext,
    hasOverflow: canScrollPrevious || canScrollNext,
    scrollPrevious: () => scrollBy(-1),
    scrollNext: () => scrollBy(1),
  };
};
