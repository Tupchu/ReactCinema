import { useEffect, useState, useCallback } from "react";
import { contentTypes, filterContent } from "../helpers/helpers";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import useDebounce from "../hooks/useDebounce";
import useQueryResults from "../hooks/useQueryResults";

const Movies = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const {
    page: topRatedPage,
    updatePageCount: updateTopRatedPageCount,
    data: topRatedData,
    error: topRatedError,
    isPending: isTopRatedPending,
    isSuccess: isTopRatedSuccess,
    isPlaceholderData: isTopRatedPlaceholder,
  } = useQueryResults(
    "topRated",
    "https://api.themoviedb.org/3/movie/top_rated"
  );

  const {
    page: upcomingPage,
    updatePageCount: updateUpcomingPageCount,
    data: upcomingData,
    error: upcomingError,
    isPending: isUpcomingPending,
    isSuccess: isUpcomingSuccess,
    isPlaceholderData: isUpcomingPlaceholder,
  } = useQueryResults(
    "upcoming",
    "https://api.themoviedb.org/3/movie/upcoming"
  );

  const {
    page: searchPage,
    updatePageCount: updateSearchPageCount,
    resetPageCount,
    data: searchData,
    error: searchError,
    isPending: isSearchPending,
    isSuccess: isSearchSuccess,
    isPlaceholderData: isSearchPlaceholder,
  } = useQueryResults(
    "search",
    "https://api.themoviedb.org/3/search/movie",
    debouncedSearch
  );

  useEffect(() => {
    if (search === "") {
      resetPageCount();
    }
  }, [search]);

  const updateSearch = useCallback(
    (search) => {
      setSearch(search);
    },
    [search]
  );

  return (
    <div>
      <SearchBar
        search={search}
        updateSearch={updateSearch}
        placeholder="Search for movies"
      />

      {!search ? (
        <>
          <ContentCards
            title="Top Rated"
            content={filterContent(topRatedData?.results)}
            contentType={contentTypes.movie}
            pageCount={topRatedPage}
            updatePageCount={updateTopRatedPageCount}
            totalPages={topRatedData?.total_pages}
            isPlaceHolder={isTopRatedPlaceholder}
            isPending={isTopRatedPending}
            isSuccess={isTopRatedSuccess}
          />

          <ContentCards
            title="Upcoming"
            content={filterContent(upcomingData?.results)}
            contentType={contentTypes.movie}
            pageCount={upcomingPage}
            updatePageCount={updateUpcomingPageCount}
            totalPages={upcomingData?.total_pages}
            isPlaceHolder={isUpcomingPlaceholder}
            isPending={isUpcomingPending}
            isSuccess={isUpcomingSuccess}
          />
        </>
      ) : (
        <ContentCards
          title="Search results"
          content={filterContent(searchData?.results)}
          contentType={contentTypes.movie}
          pageCount={searchPage}
          updatePageCount={updateSearchPageCount}
          totalPages={searchData?.total_pages}
          isPlaceHolder={isSearchPlaceholder}
          isPending={isSearchPending}
          isSuccess={isSearchSuccess}
        />
      )}
    </div>
  );
};

export default Movies;
