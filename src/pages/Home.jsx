import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { calculatePagecount, contentTypes } from "../helpers/helpers";
import useDebounce from "../hooks/useDebounce";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import useAxios from "../hooks/useAxios";
import SearchBar from "../components/ui/SearchBar/SearchBar";

const Home = () => {
  const [search, setSearch] = useState("");
  const [trendingPage, setTrendingPage] = useState(1);
  const [resultsPage, setResultsPage] = useState(1);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (search === "") {
      setResultsPage(1);
    }
  }, [search]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const updatePageCount = (page, operator) => {
    switch (page.toLowerCase()) {
      case "trending":
        setTrendingPage((prevCount) => calculatePagecount(prevCount, operator));
        break;
      case "search results":
        setResultsPage((prevCount) => calculatePagecount(prevCount, operator));
        break;
      default:
        throw new Error("Invalid page");
    }
  };

  // Trending TV & Movies
  const {
    data: trending,
    isPending: isTrendingPending,
    isSuccess: isTrendingSuccess,
    error: trendingError,
    isPlaceholderData: trendingPlaceHolder,
  } = useQuery({
    queryKey: ["trending", trendingPage],
    queryFn: () =>
      useAxios(
        "https://api.themoviedb.org/3/trending/all/day",
        "",
        trendingPage
      ),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  // Search results
  const {
    data: results,
    isPending: isResultsPending,
    isSuccess: isResultsSuccess,
    error: resultsError,
    isPlaceholderData: resultsPlaceHolder,
  } = useQuery({
    queryKey: ["all", debouncedSearch, resultsPage],
    queryFn: () =>
      useAxios(
        "https://api.themoviedb.org/3/search/multi",
        debouncedSearch,
        resultsPage
      ),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

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
            content={trending}
            contentType={contentTypes.all}
            pageCount={trendingPage}
            updatePageCount={updatePageCount}
            totalPages={trending?.total_pages}
            isPlaceHolder={trendingPlaceHolder}
            isPending={isTrendingPending}
            isSuccess={isTrendingSuccess}
          />

          {/* Recommendations -> Only show if user has bookmarked content */}
          {/* https://developer.themoviedb.org/reference/movie-recommendations */}
        </>
      ) : (
        <ContentCards
          title="Search results"
          content={results}
          contentType={contentTypes.all}
          pageCount={resultsPage}
          updatePageCount={updatePageCount}
          totalPages={results?.total_pages}
          isPlaceHolder={resultsPlaceHolder}
          isPending={isResultsPending}
          isSuccess={isResultsSuccess}
        />
      )}
    </div>
  );
};

export default Home;
