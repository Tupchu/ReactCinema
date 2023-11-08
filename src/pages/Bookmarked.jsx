import { useCallback, useState } from "react";
import { contentTypes } from "../helpers/helpers";
import SearchBar from "../components/ui/SearchBar/SearchBar";
import ContentCards from "../components/ui/ContentCards/ContentCards";
import { useCustomPagination } from "../hooks/useCustomPagination";

const Bookmarked = () => {
  const [search, setSearch] = useState("");
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
    </div>
  );
};

export default Bookmarked;
