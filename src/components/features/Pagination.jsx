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
  return (
    <div className="pagination">
      <button
        onClick={() => {
          if (!isPlaceHolder && !isPending) {
            updateContainerHeight(containerRef.current.clientHeight);
            updatePageCount(title, "-");
            titleRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "start",
            });
          }
        }}
        disabled={pageCount === 1}
        className="pagination-btn"
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (!isPlaceHolder && !isPending) {
            updateContainerHeight(containerRef.current.clientHeight);
            updatePageCount(title, "+");
            titleRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "start",
            });
          }
        }}
        disabled={pageCount === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
