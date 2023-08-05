import { ToggleThemeButton } from "./ToggleTheme";
import { Article } from "./providers/ArticlesProvider";
import { useTheme } from "./providers/ThemeProvider";

const ArticleCard = ({
  disabled,
  article: { title, content, isBookmarked },
  handleBookmarkToggle,
}: {
  disabled: boolean;
  article: Article;
  handleBookmarkToggle: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <div className="article-card">
      <h2
        className="article-title"
        style={{ color: theme === "dark" ? "tomato" : "black" }}
      >
        {title}
      </h2>
      <p className="article-content">{content}</p>
      <button
        className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
        onClick={handleBookmarkToggle}
        {...{ disabled }}
      >
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
      <ToggleThemeButton />
    </div>
  );
};

export default ArticleCard;
