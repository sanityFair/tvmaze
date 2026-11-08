import { GenreChips } from './genre-chips/genre-chips';
import { ResultsPagination } from './results-pagination/results-pagination';
import { SearchBar } from './search-bar/search-bar';
import { SearchFeedback } from './search-feedback/search-feedback';
import { ShowList } from './show-list/show-list';
import { useShowSearch } from './use-show-search';

export const ShowSearch = () => {
  const search = useShowSearch();

  return (
    <div className="flex flex-col">
      <SearchBar
        value={search.inputValue}
        isLoading={search.isLoading}
        onValueChange={search.onInputChange}
        onClear={search.onInputClear}
      />

      <div className="flex flex-col gap-6 px-4 pt-6 pb-16 sm:px-8">
        {search.hasGenreFilter && (
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
          <>
            <ShowList
              shows={search.visibleShows}
              summary={search.resultsSummary}
              isUpdating={search.isLoading}
            />
            <ResultsPagination
              page={search.page}
              totalPages={search.totalPages}
              onPageChange={search.onPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};
