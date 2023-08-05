import "./App.css";
import ArticleCard from "./ArticleCard";
import { ToggleThemeButton } from "./ToggleTheme";
import { ArticlesProvider, useArticles } from "./providers/ArticlesProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

function ArticleContainer() {
  const { articles, isLoading, removeBookMark, addBookMarkForArticle } =
    useArticles();
  return (
    <>
      <div className="article-container">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            disabled={isLoading}
            handleBookmarkToggle={() => {
              if (article.isBookmarked) {
                removeBookMark(article.id);
              } else {
                addBookMarkForArticle(article.id);
              }
            }}
          />
        ))}
      </div>
    </>
  );
}
function App() {
  return (
    <ThemeProvider>
      <h1>Articles</h1>
      <ToggleThemeButton />
      <ArticleContainer />
    </ThemeProvider>
  );
}

export default App;
