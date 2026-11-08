import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import type { ChangeEvent } from 'react';

import { Input } from '@/ui-kit/input';
import { Spinner } from '@/ui-kit/spinner';

type SearchBarProps = {
  value: string;
  isLoading: boolean;
  onValueChange: (value: string) => void;
};

const SEARCH_INPUT_ID = 'show-search-input';

export const SearchBar = ({ value, isLoading, onValueChange }: SearchBarProps) => (
  <search className="sticky top-0 z-20 border-b border-border bg-background px-4 py-4 sm:px-8">
    <label htmlFor={SEARCH_INPUT_ID} className="sr-only">
      Show title
    </label>
    <div className="relative">
      <MagnifyingGlassIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id={SEARCH_INPUT_ID}
        type="search"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
        placeholder="Search shows by title"
        autoComplete="off"
        spellCheck={false}
        aria-busy={isLoading}
        className="h-11 rounded-xl border-white/10 bg-surface! pr-11 pl-10 text-[0.95rem] transition-[border-color,box-shadow] hover:border-white/20 md:text-[0.95rem] [&::-webkit-search-cancel-button]:appearance-none"
      />
      {isLoading && (
        <Spinner
          aria-label="Searching"
          className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground"
        />
      )}
    </div>
  </search>
);
