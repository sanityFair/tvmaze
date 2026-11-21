import { GenreChips } from './genre-chips/genre-chips';
import { useShowSearchPage } from './logic/use-show-search-page';
import { ResultsPagination } from './results-pagination/results-pagination';
import { SearchBar } from './search-bar/search-bar';
import { SearchFeedback } from './search-feedback/search-feedback';
import { ShowList } from './show-list/show-list';

export const ShowSearchPage = () => {
  const search = useShowSearchPage();

  return (
    <div className="flex flex-col">
      <SearchBar
        query={search.query}
        isLoading={search.isLoading}
        onQueryChange={search.onQueryChange}
      />

      <div className="flex flex-col gap-6 px-4 pt-6 pb-16 sm:px-8">
        {search.hasGenres && (
          <GenreChips
            genres={search.genres}
            selectedGenre={search.selectedGenre}
            onGenreChange={search.onGenreChange}
          />
        )}
        <SearchFeedback
          status={search.status}
          errorMessage={search.errorMessage}
          inlineErrorMessage={search.inlineErrorMessage}
        />
        {search.hasResults && (
          <ShowList shows={search.shows} summary={search.summary} isUpdating={search.isLoading} />
        )}
        {search.hasPages && (
          <ResultsPagination
            page={search.page}
            totalPages={search.totalPages}
            isBusy={search.isLoading}
            onPageChange={search.onPageChange}
          />
        )}
      </div>
    </div>
  );
};
