import "./features.css";

const Pagination = ({
  pageCount,
  setPage,
  totalPages,
  isPlaceHolder,
  setContainerHeight,
  containerRef,
  titleRef,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          if (!isPlaceHolder) {
            // setContainerHeight(containerRef.current.clientHeight);
            setPage((prevCount) => prevCount - 1);
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
            // setContainerHeight(containerRef.current.clientHeight);
            titleRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "start",
            });
            setPage((prevCount) => prevCount + 1);
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
