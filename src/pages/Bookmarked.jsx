import { useCallback, useState } from "react";
import { contentTypes } from "../helpers/helpers";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import { useCustomPagination } from "../hooks/useCustomPagination";
import useDebounce from "../hooks/useDebounce";

const Bookmarked = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const {
    page: moviePage,
    totalPages: totalMoviePages,
    data: movieData,
    error: movieError,
    isPending: isMoviePending,
    isSuccess: isMovieSuccess,
    isPlaceholderData: isMoviePlaceholder,
    updatePageCount: updateMoviePageCount,
  } = useCustomPagination(contentTypes.movie);

  const {
    page: televisionPage,
    totalPages: totalTelevisionPages,
    data: televisionData,
    error: televisionError,
    isPending: isTelevisionPending,
    isSuccess: isTelevisionSuccess,
    isPlaceholderData: isTelevisionPlaceholder,
    updatePageCount: updateTelevisionPageCount,
  } = useCustomPagination(contentTypes.television);

  const {
    page: searchMoviePage,
    totalPages: totalSearchMoviePages,
    data: searchMovieData,
    error: searchMovieError,
    isPending: isSearchMoviePending,
    isSuccess: isSearchMovieSuccess,
    isPlaceholderData: isSearchMoviePlaceholder,
    updatePageCount: updateSearchMoviePageCount,
  } = useCustomPagination(contentTypes.movie, debouncedSearch);

  const {
    page: searchTelevisionPage,
    totalPages: totalSearchTelevisionPages,
    data: searchTelevisionData,
    error: searchTelevisionError,
    isPending: isSearchTelevisionPending,
    isSuccess: isSearchTelevisionSuccess,
    isPlaceholderData: isSearchTelevisionPlaceholder,
    updatePageCount: updateSearchTelevisionPageCount,
  } = useCustomPagination(contentTypes.television, debouncedSearch);

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
        placeholder="Search bookmarks"
      />

      {!search ? (
        <>
          <ContentCards
            title="Movies"
            content={movieData}
            contentType={contentTypes.movie}
            pageCount={moviePage}
            updatePageCount={updateMoviePageCount}
            totalPages={totalMoviePages}
            isPlaceHolder={isMoviePlaceholder}
            isPending={isMoviePending}
            isSuccess={isMovieSuccess}
          />

          <ContentCards
            title="TV"
            content={televisionData}
            contentType={contentTypes.television}
            pageCount={televisionPage}
            updatePageCount={updateTelevisionPageCount}
            totalPages={totalTelevisionPages}
            isPlaceHolder={isTelevisionPlaceholder}
            isPending={isTelevisionPending}
            isSuccess={isTelevisionSuccess}
          />
        </>
      ) : (
        <>
          <ContentCards
            title="Movie search results"
            content={searchMovieData}
            contentType={contentTypes.movie}
            pageCount={searchMoviePage}
            updatePageCount={updateSearchMoviePageCount}
            totalPages={totalSearchMoviePages}
            isPlaceHolder={isSearchMoviePlaceholder}
            isPending={isSearchMoviePending}
            isSuccess={isSearchMovieSuccess}
          />

          <ContentCards
            title="TV search results"
            content={searchTelevisionData}
            contentType={contentTypes.television}
            pageCount={searchTelevisionPage}
            updatePageCount={updateSearchTelevisionPageCount}
            totalPages={totalSearchTelevisionPages}
            isPlaceHolder={isSearchTelevisionPlaceholder}
            isPending={isSearchTelevisionPending}
            isSuccess={isSearchTelevisionSuccess}
          />
        </>
      )}
    </div>
  );
};

export default Bookmarked;
