import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { calculatePagecount, contentTypes } from "../helpers/helpers";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import useDebounce from "../hooks/useDebounce";
import useAxios from "../hooks/useAxios";

const Movies = () => {
  const [search, setSearch] = useState("");
  const [popularPage, setPopularPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
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
      case "upcoming":
        setUpcomingPage((prevCount) => calculatePagecount(prevCount, operator));
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

  // Popular movies
  const {
    data: popular,
    isPending: isPopularPending,
    isSuccess: isPopularSuccess,
    error: popularError,
    isPlaceholderData: popularPlaceHolder,
  } = useQuery({
    queryKey: ["movies", "popular", popularPage],
    queryFn: () =>
      useAxios("https://api.themoviedb.org/3/movie/popular", "", popularPage),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  // Upcoming movies query
  const {
    data: upcoming,
    isPlaceholderData: upcomingPlaceHolder,
    isPending: isUpcomingPending,
    isSuccess: isUpcomingSuccess,
    error: upcomingError,
  } = useQuery({
    queryKey: ["movies", "upcoming", upcomingPage],
    queryFn: () =>
      useAxios("https://api.themoviedb.org/3/movie/upcoming", "", upcomingPage),
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
    queryKey: ["movies", debouncedSearch, resultsPage],
    queryFn: () =>
      useAxios(
        "https://api.themoviedb.org/3/search/movie",
        debouncedSearch,
        resultsPage
      ),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  if (popularError) return <h2>{popularError.message}</h2>;
  if (upcomingError) return <h2>{upcomingError.message}</h2>;
  if (resultsError) return <h2>{resultsError.message}</h2>;

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
            title="Popular"
            content={popular}
            contentType={contentTypes.movie}
            pageCount={popularPage}
            updatePageCount={updatePageCount}
            totalPages={popular?.total_pages}
            isPlaceHolder={popularPlaceHolder}
            isPending={isPopularPending}
            isSuccess={isPopularSuccess}
          />

          <ContentCards
            title="Upcoming"
            content={upcoming}
            contentType={contentTypes.movie}
            pageCount={upcomingPage}
            updatePageCount={updatePageCount}
            totalPages={upcoming?.total_pages}
            isPlaceHolder={upcomingPlaceHolder}
            isPending={isUpcomingPending}
            isSuccess={isUpcomingSuccess}
          />
        </>
      ) : (
        <ContentCards
          title="Search results"
          content={results}
          contentType={contentTypes.movie}
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

export default Movies;
