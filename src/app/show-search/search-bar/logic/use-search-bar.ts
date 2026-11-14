import { type ChangeEvent, useRef } from 'react';

type UseSearchBarOptions = {
  value: string;
  onValueChange: (value: string) => void;
  onClear: () => void;
};

export const useSearchBar = ({ value, onValueChange, onClear }: UseSearchBarOptions) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return {
    inputRef,
    canClear: value !== '',
    onChange: handleChange,
    onClear: handleClear,
  };
};
