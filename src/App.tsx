import { useEffect, useState } from "react";
import "./App.css";
import ArticleCard from "./ArticleCard";
export type Article = {
  id: number;
  title: string;
  content: string;
  isBookmarked: boolean;
};

const updateArticle = (id: number, body: Partial<Article>) =>
  fetch(`http://localhost:3000/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = () =>
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then(setArticles);

  useEffect(() => {
    refetch();
  }, []);

  const addBookMarkForArticle = (articleId: number) => {
    setArticles(
      articles.map((article) =>
        article.id === articleId ? { ...article, isBookmarked: true } : article
      )
    );
    updateArticle(articleId, { isBookmarked: true }).then((response) => {
      if (!response.ok) {
        setArticles(articles);
      } else return;
    });
  };

  const removeBookMark = (articleId: number) => {
    setArticles(
      articles.map((article) =>
        article.id === articleId ? { ...article, isBookmarked: false } : article
      )
    );
    updateArticle(articleId, { isBookmarked: false }).then((response) => {
      if (!response.ok) {
        setArticles(articles);
      } else return;
    });
  };

  return (
    <>
      <h1>Articles</h1>
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

export default App;
