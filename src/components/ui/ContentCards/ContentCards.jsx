import Pagination from "../../features/Pagination";
import ContentCard from "./ContentCard";
import Loading from "../Loading";
import "./card.css";
import { useEffect, useRef, useState } from "react";

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

  const updateContainerHeight = (height) => {
    setContainerHeight(height);
  };

  return (
    <>
      <h2 ref={titleRef}>{title}</h2>
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
        {isSuccess &&
          content?.map((item) => {
            return (
              <ContentCard
                item={item}
                contentType={contentType}
                key={item.id}
              />
            );
          })}
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
      />
    </>
  );
};

export default ContentCards;
