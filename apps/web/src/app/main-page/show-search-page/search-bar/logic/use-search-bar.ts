import { type ChangeEvent, useEffect, useRef, useState } from 'react';

const SEARCH_DEBOUNCE_MS = 400;

export const useSearchBar = (query: string, onQueryChange: (query: string) => void) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);

  if (query !== syncedQuery) {
    setSyncedQuery(query);
    if (query !== value.trim()) setValue(query);
  }

  const pendingQuery = value.trim();

  useEffect(() => {
    if (pendingQuery === query) return;
    const timer = setTimeout(() => onQueryChange(pendingQuery), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [pendingQuery, query, onQueryChange]);

  return {
    inputRef,
    value,
    canClear: value !== '',
    onChange: (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    onClear: () => {
      setValue('');
      onQueryChange('');
      inputRef.current?.focus();
    },
  };
};
