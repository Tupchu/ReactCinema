import ContentCard from "./ContentCard";
import "./card.css";

// Responsible for content cards and the title of the content
const ContentCards = ({ title, content, contentType }) => {
  return (
    <>
      <h2>{title}</h2>
      <div className="content-grid">
        {content?.results.map((item) => {
          return (
            <ContentCard item={item} contentType={contentType} key={item.id} />
          );
        })}
      </div>
    </>
  );
};

export default ContentCards;
