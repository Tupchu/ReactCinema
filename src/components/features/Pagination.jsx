import { useEffect } from "react";
import "./features.css";

const Pagination = ({
  title,
  pageCount,
  updatePageCount,
  totalPages,
  updateContainerHeight,
  containerRef,
  titleRef,
  isPlaceHolder,
  isPending,
}) => {
  const handlePaginationClick = (operator) => {
    if (!isPlaceHolder && !isPending) {
      updateContainerHeight(containerRef.current.clientHeight);
      updatePageCount(operator);
      titleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePaginationClick("-")}
        disabled={pageCount === 1}
        className="pagination-btn"
      >
        Prev
      </button>
      <button
        onClick={() => handlePaginationClick("+")}
        disabled={pageCount === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
