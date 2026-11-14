import { GenreChips } from './genre-chips/genre-chips';
import { useShowSearch } from './logic/use-show-search';
import { ResultsPagination } from './results-pagination/results-pagination';
import { SearchBar } from './search-bar/search-bar';
import { SearchFeedback } from './search-feedback/search-feedback';
import { ShowList } from './show-list/show-list';

export const ShowSearch = () => {
  useShowSearch();

  return (
    <div className="flex flex-col">
      <SearchBar />

      <div className="flex flex-col gap-6 px-4 pt-6 pb-16 sm:px-8">
        <GenreChips />
        <SearchFeedback />
        <ShowList />
        <ResultsPagination />
      </div>
    </div>
  );
};
