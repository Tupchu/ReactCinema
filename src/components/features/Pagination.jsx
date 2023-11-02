import "./features.css";

const Pagination = ({
  title,
  pageCount,
  updatePageCount,
  totalPages,
  isPlaceHolder,
  updateContainerHeight,
  containerRef,
  titleRef,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          if (!isPlaceHolder) {
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
          if (!isPlaceHolder) {
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
