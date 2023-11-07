import movieIcon from "../../../assets/icon-nav-movies.svg";
import Bookmark from "../../features/Bookmark";
import { useState } from "react";
import "./card.css";

const basePath = "https://image.tmdb.org/t/p/w780";

const MovieCard = ({ item, contentType }, key) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const date = new Date(item.release_date);

  return (
    <div className="content-card" key={key}>
      <img
        src={basePath + item.backdrop_path}
        alt={item.title}
        title={item.title}
        className="content-img"
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? "initial" : "none" }}
      />

      <Bookmark contentType={contentType} item={item} />

      <div className="content-info">
        <p className="content-date">{date.getFullYear()}</p>
        <span className="content-spacer"></span>
        <>
          <img src={movieIcon} />
          <p>Movie</p>
        </>
      </div>

      <h3 className="content-title">{item.title}</h3>
    </div>
  );
};

export default MovieCard;
