import { useState } from "react";
import { calculatePagecount } from "../helpers/helpers";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useQueryResults = (key, url, search = "") => {
  const [page, setPage] = useState(1);

  const updatePageCount = (operator) => {
    setPage((prev) => calculatePagecount(prev, operator));
  };

  const resetPageCount = () => {
    setPage(1);
  };

  //useQuery
  const { data, error, isPending, isSuccess, isPlaceholderData } = useQuery({
    queryKey: search ? [key, search, page] : [key, page],
    queryFn: () => useAxios(url, search, page),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  return {
    page,
    updatePageCount,
    resetPageCount,
    data,
    error,
    isPending,
    isSuccess,
    isPlaceholderData,
  };
};

export default useQueryResults;
