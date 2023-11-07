import { useState } from "react";

export const usePaginationState = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  return {
    page,
    setPage,
    totalPages,
    setTotalPages,
    startIndex,
    setStartIndex,
  };
};
