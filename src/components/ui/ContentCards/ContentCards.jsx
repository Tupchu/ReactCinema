import Pagination from "../../features/Pagination";
import Loading from "../Loading";
import "./card.css";
import { useEffect, useRef, useState } from "react";
import { contentTypes } from "../../../helpers/helpers";
import MovieCard from "./MovieCard";
import TVCard from "./TVCard";

/* 
Responsible for content cards and the title of the content

containerHeight - stores the height of the content container when fetching new data to avoid UI jumps
containerRef - get the client height of the content container
titleRef - used to scroll new results into view
*/

const ContentCards = ({
  title,
  content,
  contentType,
  pageCount,
  updatePageCount,
  totalPages,
  isPlaceHolder,
  isPending,
  isSuccess,
}) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  // resets the container height on screen resize
  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setContainerHeight]);

  // resets the min height on the content container when the length is different than previous
  useEffect(() => {
    const length = localStorage.getItem(`${title}-${contentType}-length`);

    if (!length && content) {
      localStorage.setItem(`${title}-${contentType}-length`, content?.length);
    } else if (length && content && length != content.length) {
      setContainerHeight(0);
      localStorage.setItem(`${title}-${contentType}-length`, content?.length);
    }
  });

  const updateContainerHeight = (height) => {
    setContainerHeight(height);
  };

  return (
    <>
      <h2 ref={titleRef}>{title}</h2>
      {content?.length === 0 && <p>No results</p>}
      <div
        className="content-grid"
        style={{ minHeight: containerHeight }}
        ref={containerRef}
      >
        {(isPlaceHolder || isPending) && (
          <div className="content-loading">
            <Loading />
          </div>
        )}
        {(isSuccess &&
          contentType === contentTypes.all &&
          content?.map((item) => {
            return item.media_type === contentTypes.television ? (
              <TVCard item={item} contentType={contentType} key={item.id} />
            ) : (
              <MovieCard item={item} contentType={contentType} key={item.id} />
            );
          })) ||
          (contentType === contentTypes.movie &&
            content?.map((item) => {
              return (
                <MovieCard
                  item={item}
                  contentType={contentType}
                  key={item.id}
                />
              );
            })) ||
          (contentType === contentTypes.television &&
            content?.map((item) => {
              return (
                <TVCard item={item} contentType={contentType} key={item.id} />
              );
            }))}
      </div>

      <Pagination
        title={title}
        pageCount={pageCount}
        updatePageCount={updatePageCount}
        totalPages={totalPages}
        updateContainerHeight={updateContainerHeight}
        containerRef={containerRef}
        titleRef={titleRef}
        isPlaceHolder={isPlaceHolder}
        isPending={isPending}
        contentLength={content?.length}
      />
    </>
  );
};

export default ContentCards;
