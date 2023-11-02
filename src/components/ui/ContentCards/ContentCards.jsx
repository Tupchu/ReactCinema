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
  setPage,
  totalPages,
  isPlaceHolder,
  isPending,
}) => {
  const [containerHeight, setContainerHeight] = useState();
  const containerRef = useRef();
  const titleRef = useRef();

  // useEffect(() => {
  //   setContainerHeight(0);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setContainerHeight]);

  const results = content?.results
    .filter((item) => {
      return item.backdrop_path !== null && item.release_date !== null;
    })
    .slice(0, 8);

  return (
    <>
      <h2 ref={titleRef}>{title}</h2>
      <div
        className="content-grid"
        style={{ minHeight: containerHeight }}
        ref={containerRef}
      >
        {!isPending && !isPlaceHolder ? (
          results.map((item) => {
            return (
              <ContentCard
                item={item}
                contentType={contentType}
                key={item.id}
              />
            );
          })
        ) : (
          <div className="content-loading">
            <Loading />
          </div>
        )}
      </div>
      <Pagination
        pageCount={pageCount}
        setPage={setPage}
        totalPages={totalPages}
        isPlaceHolder={isPlaceHolder}
        setContainerHeight={setContainerHeight}
        containerRef={containerRef}
        titleRef={titleRef}
      />
    </>
  );
};

export default ContentCards;

// {!isPending && !isPlaceHolder ? (
//   <div className="content-grid" ref={contentContainer}>
//     {results.map((item) => {
//       return (
//         <ContentCard
//           item={item}
//           contentType={contentType}
//           key={item.id}
//         />
//       );
//     })}
//   </div>
// ) : (
//   <div className="content-loading">
//     <Loading />
//   </div>
// )}
