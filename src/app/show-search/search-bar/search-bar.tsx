import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';

import { Button } from '~/ui-kit/button';
import { Input } from '~/ui-kit/input';
import { Spinner } from '~/ui-kit/spinner';

import { useSearchBar } from './logic/use-search-bar';

type SearchBarProps = {
  value: string;
  isLoading: boolean;
  onValueChange: (value: string) => void;
  onClear: () => void;
};

const SEARCH_INPUT_ID = 'show-search-input';

export const SearchBar = ({ value, isLoading, onValueChange, onClear }: SearchBarProps) => {
  const { inputRef, ...bar } = useSearchBar({ value, onValueChange, onClear });

  return (
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
          ref={inputRef}
          id={SEARCH_INPUT_ID}
          type="search"
          value={value}
          onChange={bar.onChange}
          placeholder="Search shows by title"
          autoComplete="off"
          spellCheck={false}
          aria-busy={isLoading}
          className="h-11 rounded-xl border-white/10 bg-surface! pr-18 pl-10 text-[0.95rem] transition-[border-color,box-shadow] hover:border-white/20 md:text-[0.95rem] [&::-webkit-search-cancel-button]:appearance-none"
        />
        <div className="absolute inset-y-0 right-2 flex items-center gap-1.5">
          {isLoading && <Spinner aria-label="Searching" className="text-muted-foreground" />}
          {bar.canClear && (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Clear search"
              onClick={bar.onClear}
              className="rounded-lg text-muted-foreground hover:text-foreground"
            >
              <XIcon aria-hidden />
            </Button>
          )}
        </div>
      </div>
    </search>
  );
};
