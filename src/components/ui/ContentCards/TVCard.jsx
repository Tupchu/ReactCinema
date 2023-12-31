import tvIcon from "../../../assets/icon-nav-tv-series.svg";
import Bookmark from "../../features/Bookmark";
import { useState } from "react";
import "./card.css";

const basePath = "https://image.tmdb.org/t/p/w780";

const TVCard = ({ item, contentType }, key) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const date = new Date(item.first_air_date);

  return (
    <div className="content-card" key={key}>
      <img
        src={basePath + item.backdrop_path}
        alt={item.name}
        title={item.name}
        className="content-img"
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? "initial" : "none" }}
      />

      <Bookmark contentType={contentType} item={item} />

      <div className="content-info">
        <p className="content-date">{date.getFullYear()}</p>
        <span className="content-spacer"></span>
        <>
          <img src={tvIcon} />
          <p>TV Series</p>
        </>
      </div>

      <h3 className="content-title">{item.name}</h3>
    </div>
  );
};

export default TVCard;
