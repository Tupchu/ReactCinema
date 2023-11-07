import { useCallback, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { calculatePagecount, contentTypes } from "../helpers/helpers";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import { usePaginationState } from "../hooks/usePaginationState";

const Bookmarked = () => {
  const [search, setSearch] = useState("");
  const {
    page: moviePage,
    setPage: setMoviePage,
    totalPages: totalMoviePages,
    setTotalPages: setTotalMoviePages,
    startIndex: startMovieIndex,
    setStartIndex: setStartMovieIndex,
  } = usePaginationState();

  const {
    page: televisionPage,
    setPage: setTelevisionPage,
    totalPages: totalTelevisionPages,
    setTotalPages: setTotalTelevisionPages,
    startIndex: startTelevisionIndex,
    setStartIndex: setStartTelevisionIndex,
  } = usePaginationState();

  const resultsPerPage = 8;

  const updateSearch = useCallback(
    (search) => {
      setSearch(search);
    },
    [search]
  );

  const updatePageCount = (page, operator) => {
    switch (page.toLowerCase()) {
      case "movies":
        setMoviePage((prevCount) => calculatePagecount(prevCount, operator));
        setStartMovieIndex((prevInd) =>
          operator === "-" ? prevInd - resultsPerPage : prevInd + resultsPerPage
        );
        break;
      case "tv":
        setTelevisionPage((prevCount) =>
          calculatePagecount(prevCount, operator)
        );
        setStartTelevisionIndex((prevInd) =>
          operator === "-" ? prevInd - resultsPerPage : prevInd + resultsPerPage
        );
        break;
      default:
        throw new Error("Invalid page");
    }
  };

  const {
    data: movies,
    isPending: moviesPending,
    isSuccess: moviesSuccess,
    isPlaceHolder: moviesPlaceHolder,
  } = useQuery({
    queryKey: ["bookmarked", "movies", moviePage],
    queryFn: () => {
      const { getItems } = useLocalStorage("movie");
      setTotalMoviePages(Math.ceil(getItems().length / resultsPerPage));
      return getItems().slice(
        startMovieIndex,
        startMovieIndex + resultsPerPage
      );
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  const {
    data: tv,
    isPending: tvPending,
    isSuccess: tvSuccess,
    isPlaceholderData: tvPlaceHolder,
  } = useQuery({
    queryKey: ["bookmarked", "tv", televisionPage],
    queryFn: () => {
      const { getItems } = useLocalStorage("tv");
      setTotalTelevisionPages(Math.ceil(getItems().length / resultsPerPage));
      return getItems().slice(
        startTelevisionIndex,
        startTelevisionIndex + resultsPerPage
      );
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <SearchBar
        search={search}
        updateSearch={updateSearch}
        placeholder="Search bookmarks"
      />

      <ContentCards
        title="Movies"
        content={movies}
        contentType={contentTypes.movie}
        pageCount={moviePage}
        updatePageCount={updatePageCount}
        totalPages={totalMoviePages}
        isPlaceHolder={moviesPlaceHolder}
        isPending={moviesPending}
        isSuccess={moviesSuccess}
      />

      <ContentCards
        title="TV"
        content={tv}
        contentType={contentTypes.television}
        pageCount={televisionPage}
        updatePageCount={updatePageCount}
        totalPages={totalTelevisionPages}
        isPlaceHolder={tvPlaceHolder}
        isPending={tvPending}
        isSuccess={tvSuccess}
      />
    </div>
  );
};

export default Bookmarked;
