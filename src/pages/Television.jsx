import { useState, useEffect, useCallback } from "react";
import { contentTypes, filterContent } from "../helpers/helpers";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import useQueryResults from "../hooks/useQueryResults";

const Television = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const {
    page: popularPage,
    updatePageCount: updatePopularPageCount,
    data: popularData,
    error: popularError,
    isPending: isPopularPending,
    isSuccess: isPopularSuccess,
    isPlaceholderData: isPopularPlaceholder,
  } = useQueryResults("tv-popular", "https://api.themoviedb.org/3/tv/popular");

  const {
    page: airingPage,
    updatePageCount: updateAiringPageCount,
    data: airingData,
    error: airingError,
    isPending: isAiringPending,
    isSuccess: isAiringSuccess,
    isPlaceholderData: isAiringPlaceholder,
  } = useQueryResults("Airing", "https://api.themoviedb.org/3/tv/airing_today");

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
    "https://api.themoviedb.org/3/search/tv",
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
        placeholder="Search for TV series"
      />

      {!search ? (
        <>
          <ContentCards
            title="Popular"
            content={filterContent(popularData?.results)}
            contentType={contentTypes.television}
            pageCount={popularPage}
            updatePageCount={updatePopularPageCount}
            totalPages={popularData?.total_pages}
            isPlaceHolder={isPopularPlaceholder}
            isPending={isPopularPending}
            isSuccess={isPopularSuccess}
          />

          <ContentCards
            title="Airing Today"
            content={filterContent(airingData?.results)}
            contentType={contentTypes.television}
            pageCount={airingPage}
            updatePageCount={updateAiringPageCount}
            totalPages={airingData?.total_pages}
            isPlaceHolder={isAiringPlaceholder}
            isPending={isAiringPending}
            isSuccess={isAiringSuccess}
          />
        </>
      ) : (
        <ContentCards
          title="Search results"
          content={filterContent(searchData?.results)}
          contentType={contentTypes.television}
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

export default Television;
