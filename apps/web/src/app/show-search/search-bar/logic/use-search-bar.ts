import debounce from 'debounce';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import { selectIsLoading, useShowSearchStore } from '../../stores/show-search.store';

const SEARCH_DEBOUNCE_MS = 400;

export const useSearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const isLoading = useShowSearchStore(selectIsLoading);
  const setQuery = useShowSearchStore((state) => state.setQuery);
  const [commitQuery] = useState(() => debounce(setQuery, SEARCH_DEBOUNCE_MS));

  useEffect(() => () => commitQuery.clear(), [commitQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    commitQuery(event.target.value.trim());
  };

  const handleClear = () => {
    commitQuery.clear();
    setValue('');
    setQuery('');
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
