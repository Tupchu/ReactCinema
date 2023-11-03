import movieIcon from "../../../assets/icon-nav-movies.svg";
import tvIcon from "../../../assets/icon-nav-tv-series.svg";
import Bookmark from "../../features/Bookmark";
import { useState } from "react";
import { contentTypes } from "../../../helpers/helpers";
import "./card.css";

const basePath = "https://image.tmdb.org/t/p/w780";

const ContentCard = ({ item, contentType }, key) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const date = new Date(item.release_date || item.first_air_date);

  return (
    <div className="content-card" key={key}>
      <img
        src={basePath + item.backdrop_path}
        alt={item.title || item.name}
        title={item.title || item.name}
        className="content-img"
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? "initial" : "none" }}
      />

      <Bookmark contentType={contentType} item={item} />

      <div className="content-info">
        <p className="content-date">{date.getFullYear()}</p>
        <span className="content-spacer"></span>
        {contentType === contentTypes.all && (
          <>
            <img
              src={
                item.media_type === contentTypes.television ? tvIcon : movieIcon
              }
            />
            <p>
              {item.media_type === contentTypes.television
                ? "TV Series"
                : "Movie"}
            </p>
          </>
        )}
        {contentType === contentTypes.movie && (
          <>
            <img src={movieIcon} />
            <p>Movie</p>
          </>
        )}

        {contentType === contentTypes.television && (
          <>
            <img src={tvIcon} />
            <p>TV Series</p>
          </>
        )}
      </div>

      <h3 className="content-title">{item.title || item.name}</h3>
    </div>
  );
};

export default ContentCard;
