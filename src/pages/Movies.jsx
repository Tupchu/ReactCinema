import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
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

  // Popular movies
  const {
    data: popular,
    isPending: isPopularPending,
    error: popularError,
    isPlaceholderData: popularPlaceHolder,
  } = useQuery({
    queryKey: ["popular", popularPage],
    queryFn: () =>
      useAxios("https://api.themoviedb.org/3/movie/popular", "", popularPage),
    staleTime: 60000,
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  // Upcoming movies query
  const {
    data: upcoming,
    isPlaceholderData: upcomingPlaceHolder,
    isPending: isUpcomingPending,
  } = useQuery({
    queryKey: ["upcoming", upcomingPage],
    queryFn: () =>
      useAxios("https://api.themoviedb.org/3/movie/upcoming", "", upcomingPage),
    staleTime: 60000,
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  // Search results
  const {
    data: results,
    isPending: isResultsPending,
    error: resultsError,
    isPlaceholderData: resultsPlaceHolder,
  } = useQuery({
    queryKey: ["results", debouncedSearch, resultsPage],
    queryFn: () =>
      useAxios(
        "https://api.themoviedb.org/3/search/movie",
        debouncedSearch,
        resultsPage
      ),
    staleTime: 60000,
    placeholderData: keepPreviousData,
  });

  if (popularError) return <h2>{popularError.message}</h2>;
  if (resultsError) return <h2>{resultsError.message}</h2>;

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search for movies"
      />

      {!search ? (
        <>
          <ContentCards
            title="Popular"
            content={popular}
            contentType="movies"
            pageCount={popularPage}
            setPage={setPopularPage}
            totalPages={popular?.total_pages}
            isPlaceHolder={popularPlaceHolder}
            isPending={isPopularPending}
          />

          <ContentCards
            title="Upcoming"
            content={upcoming}
            contentType="movies"
            pageCount={upcomingPage}
            setPage={setUpcomingPage}
            totalPages={upcoming?.total_pages}
            isPlaceHolder={upcomingPlaceHolder}
            isPending={isUpcomingPending}
          />
        </>
      ) : (
        <ContentCards
          title="Search results"
          content={results}
          contentType="movies"
          pageCount={resultsPage}
          setPage={setResultsPage}
          totalPages={results?.total_pages}
          isPlaceHolder={resultsPlaceHolder}
          isPending={isResultsPending}
        />
      )}

      {/* {(isPending || isSearchPending) && <h1>Loading...</h1>} */}
    </div>
  );
};

export default Movies;
