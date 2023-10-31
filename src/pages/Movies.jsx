import { useEffect, useState } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import SearchBar from "../components/ui/SearchBar";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import useDebounce from "../hooks/useDebounce";

const Movies = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const setOptions = (url, query) => {
    return {
      method: "GET",
      url,
      params: { include_adult: "false", language: "en-US", page: "1", query },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    };
  };

  const {
    data: movies,
    isPending,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      axios
        .request(setOptions("https://api.themoviedb.org/3/movie/popular"))
        .then((response) => response.data),
  });

  if (error) return <h2>{error.message}</h2>;

  const {
    data: searchMovies,
    isPending: isSearchPending,
    error: searchError,
  } = useQuery({
    queryKey: ["searchMovieResults", debouncedSearch],
    queryFn: () =>
      axios
        .request(
          setOptions("https://api.themoviedb.org/3/search/movie", search)
        )
        .then((response) => response.data),
  });

  if (searchError) return <h2>{searchError.message}</h2>;

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search for movies"
      />

      {!search ? (
        <ContentCards title="Popular" content={movies} contentType="movies" />
      ) : (
        <ContentCards
          title="Search results"
          content={searchMovies}
          contentType="movies"
        />
      )}

      {(isPending || isSearchPending) && <h1>Loading...</h1>}
    </div>
  );
};

export default Movies;
