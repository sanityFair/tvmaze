import debounce from 'debounce';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import { useShowSearchStore } from '../../logic/show-search.store';
import { searchShows } from '../../logic/tasks/search-shows';

const SEARCH_DEBOUNCE_MS = 400;

export const useSearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const isLoading = useShowSearchStore((state) => state.isLoading);
  const [commitQuery] = useState(() =>
    debounce((query: string) => void searchShows(query), SEARCH_DEBOUNCE_MS),
  );

  useEffect(() => () => commitQuery.clear(), [commitQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    commitQuery(event.target.value.trim());
  };

  const handleClear = () => {
    commitQuery.clear();
    setValue('');
    void searchShows('');
    inputRef.current?.focus();
  };

  return {
    inputRef,
    value,
    isLoading,
    canClear: value !== '',
    onChange: handleChange,
    onClear: handleClear,
  };
};
