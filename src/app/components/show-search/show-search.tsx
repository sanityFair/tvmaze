import { GenreChips } from './components/genre-chips/genre-chips';
import { ResultsPagination } from './components/results-pagination/results-pagination';
import { SearchBar } from './components/search-bar/search-bar';
import { SearchFeedback } from './components/search-feedback/search-feedback';
import { ShowList } from './components/show-list/show-list';
import { useShowSearch } from './use-show-search';

export const ShowSearch = () => {
  const search = useShowSearch();

  return (
    <div className="flex flex-col">
      <SearchBar
        value={search.inputValue}
        isLoading={search.isLoading}
        onValueChange={search.onInputChange}
      />

      <div className="flex flex-col gap-6 px-4 pt-6 pb-16 sm:px-8">
        {search.hasResults && search.genres.length > 0 && (
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
