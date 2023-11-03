import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { calculatePagecount, contentTypes } from "../helpers/helpers";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import useDebounce from "../hooks/useDebounce";
import useAxios from "../hooks/useAxios";
import SearchBar from "../components/ui/SearchBar/SearchBar";

const Television = () => {
  const [search, setSearch] = useState("");
  const [popularPage, setPopularPage] = useState(1);
  const [airingPage, setAiringPage] = useState(1);
  const [resultsPage, setResultsPage] = useState(1);
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (search === "") {
      setResultsPage(1);
    }
  }, [search]);

  const updatePageCount = (page, operator) => {
    switch (page.toLowerCase()) {
      case "popular":
        setPopularPage((prevCount) => calculatePagecount(prevCount, operator));
        break;
      case "airing today":
        setAiringPage((prevCount) => calculatePagecount(prevCount, operator));
        break;
      case "search results":
        setResultsPage((prevCount) => calculatePagecount(prevCount, operator));
        break;
      default:
        throw new Error("Invalid page");
    }
  };

  const updateSearch = (search) => {
    setSearch(search);
  };

  // Popular TV
  const {
    data: popular,
    isPending: isPopularPending,
    isSuccess: isPopularSuccess,
    error: popularError,
    isPlaceholderData: popularPlaceHolder,
  } = useQuery({
    queryKey: ["TV", "popular", popularPage],
    queryFn: () =>
      useAxios("https://api.themoviedb.org/3/tv/popular", "", popularPage),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  // Airing Today
  const {
    data: airing,
    isPending: isAiringPending,
    isSuccess: isAiringSuccess,
    error: airingError,
    isPlaceholderData: airingPlaceHolder,
  } = useQuery({
    queryKey: ["TV", "airing", airingPage],
    queryFn: () =>
      useAxios("https://api.themoviedb.org/3/tv/airing_today", "", airingPage),
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
    queryKey: ["TV", debouncedSearch, resultsPage],
    queryFn: () =>
      useAxios(
        "https://api.themoviedb.org/3/search/tv",
        debouncedSearch,
        resultsPage
      ),
    staleTime: 60000,
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  if (popularError) return <h2>{popularError.message}</h2>;
  if (airingError) return <h2>{airingError.message}</h2>;
  if (resultsError) return <h2>{resultsError.message}</h2>;

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
            content={popular}
            contentType={contentTypes.television}
            pageCount={popularPage}
            updatePageCount={updatePageCount}
            totalPages={popular?.total_pages}
            isPlaceHolder={popularPlaceHolder}
            isPending={isPopularPending}
            isSuccess={isPopularSuccess}
          />

          <ContentCards
            title="Airing Today"
            content={airing}
            contentType={contentTypes.television}
            pageCount={airingPage}
            updatePageCount={updatePageCount}
            totalPages={airing?.total_pages}
            isPlaceHolder={airingPlaceHolder}
            isPending={isAiringPending}
            isSuccess={isAiringSuccess}
          />
        </>
      ) : (
        <ContentCards
          title="Search results"
          content={results}
          contentType={contentTypes.television}
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

export default Television;
