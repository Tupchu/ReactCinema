import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import "./features.css";
import { useState } from "react";

const Bookmark = ({ contentType, item }) => {
  const [bookmarked, setBookmarked] = useState(false);

  // save item to localstorage

  return (
    <div
      className="bookmark"
      onClick={() => {
        setBookmarked((prevValue) => !prevValue);
      }}
    >
      <img
        src={bookmarked ? bookmarkFull : bookmarkEmpty}
        alt="Not bookmarked"
      />
    </div>
  );
};

export default Bookmark;
