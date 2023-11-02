import movieIcon from "../../../assets/icon-nav-movies.svg";
import tvIcon from "../../../assets/icon-nav-tv-series.svg";
import Bookmark from "../../features/Bookmark";
import "./card.css";

const basePath = "https://image.tmdb.org/t/p/w780";

const ContentCard = ({ item, contentType }, key) => {
  const date = new Date(item.release_date);

  return (
    <div className="content-card" key={key}>
      <img
        src={basePath + item.backdrop_path}
        alt={item.title}
        title={item.title}
        className="content-img"
      />

      <Bookmark contentType={contentType} item={item} />

      <div className="content-info">
        <p className="content-date">{date.getFullYear()}</p>
        <span className="content-spacer"></span>
        {contentType === "movies" ? (
          <>
            <img src={movieIcon} />
            <p>Movie</p>
          </>
        ) : (
          <>
            <img src={tvIcon} />
            <p>TV Series</p>
          </>
        )}
      </div>

      <h3 className="content-title">{item.title}</h3>
    </div>
  );
};

export default ContentCard;
