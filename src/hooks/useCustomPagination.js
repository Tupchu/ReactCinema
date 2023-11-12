import { useState } from "react";
import { calculatePagecount, contentTypes } from "../helpers/helpers";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

export const useCustomPagination = (key, search = "") => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const resultsPerPage = 8;

  const updatePageCount = (operator) => {
    setPage((prev) => calculatePagecount(prev, operator));
    setStartIndex((prevInd) =>
      operator === "-" ? prevInd - resultsPerPage : prevInd + resultsPerPage
    );
  };

  //useQuery
  const { data, error, isPending, isSuccess, isPlaceholderData } = useQuery({
    queryKey: search ? [key, search, page] : [key, page],
    queryFn: () => {
      const { getItems } = useLocalStorage(key); // movie or tv
      const items = getItems();

      if (search !== "") {
        const filtered = items.filter((item) => {
          return key === contentTypes.television
            ? item.name.toLowerCase().includes(search.toLowerCase())
            : item.title.toLowerCase().includes(search.toLowerCase());
        });
        setTotalPages(Math.ceil(filtered.length / resultsPerPage));
        return filtered.slice(startIndex, startIndex + resultsPerPage);
      } else {
        setTotalPages(Math.ceil(items.length / resultsPerPage));
        return items.slice(startIndex, startIndex + resultsPerPage);
      }
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  return {
    page,
    totalPages,
    data,
    error,
    isPending,
    isSuccess,
    isPlaceholderData,
    updatePageCount,
  };
};
