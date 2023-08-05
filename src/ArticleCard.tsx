import { Article } from "./App";

const ArticleCard = ({
  disabled,
  article: { title, content, isBookmarked },
  handleBookmarkToggle,
}: {
  disabled: boolean;
  article: Article;
  handleBookmarkToggle: () => void;
}) => {
  return (
    <div className="article-card">
      <h2 className="article-title">{title}</h2>
      <p className="article-content">{content}</p>
      <button
        className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
        onClick={handleBookmarkToggle}
        {...{ disabled }}
      >
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
};

export default ArticleCard;
