import { useState, useEffect, useCallback } from "react";
import { contentTypes, filterContent } from "../helpers/helpers";
import useDebounce from "../hooks/useDebounce";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import useQueryResults from "../hooks/useQueryResults";

const Home = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const {
    page: trendingPage,
    updatePageCount: updateTrendingPageCount,
    data: trendingData,
    error: trendingError,
    isPending: isTrendingPending,
    isSuccess: isTrendingSuccess,
    isPlaceholderData: isTrendingPlaceholder,
  } = useQueryResults(
    "trending",
    "https://api.themoviedb.org/3/trending/all/day"
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
    "https://api.themoviedb.org/3/search/multi",
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
        placeholder="Search for movies or TV series"
      />

      {!search ? (
        <>
          <ContentCards
            title="Trending"
            content={filterContent(trendingData?.results)}
            contentType={contentTypes.all}
            pageCount={trendingPage}
            updatePageCount={updateTrendingPageCount}
            totalPages={trendingData?.total_pages}
            isPlaceHolder={isTrendingPlaceholder}
            isPending={isTrendingPending}
            isSuccess={isTrendingSuccess}
          />

          {/* Recommendations -> Only show if user has bookmarked content */}
          {/* https://developer.themoviedb.org/reference/movie-recommendations */}
        </>
      ) : (
        <ContentCards
          title="Search results"
          content={filterContent(searchData?.results)}
          contentType={contentTypes.all}
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

export default Home;
