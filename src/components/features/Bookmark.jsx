import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import "./features.css";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useQueryClient } from "@tanstack/react-query";

const Bookmark = ({ contentType, item }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const queryClient = useQueryClient();
  const {
    setItem,
    removeItem,
    hasItem: isBookmarked,
  } = useLocalStorage(contentType, item);

  // checks local storage to set bookmarked items
  useEffect(() => {
    isBookmarked() && setBookmarked(true);
  }, []);

  const updateBookmark = () => {
    const items = document.querySelectorAll(`[data-id="${item.id}"]`);

    if (!bookmarked) {
      setItem();
    } else {
      removeItem();
    }
    setBookmarked((prev) => !prev);

    // if the same content is on the page in multiple sections use reset queries to force a refetch/show updated bookmarked UI
    items.length > 1
      ? queryClient.resetQueries()
      : queryClient.invalidateQueries([""]);
  };

  return (
    <div
      className="bookmark"
      onClick={() => updateBookmark()}
      data-id={item.id}
    >
      <img src={bookmarked ? bookmarkFull : bookmarkEmpty} alt="bookmark" />
    </div>
  );
};

export default Bookmark;
