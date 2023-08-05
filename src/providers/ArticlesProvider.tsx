import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Article = {
  id: number;
  title: string;
  content: string;
  isBookmarked: boolean;
};

type TArticleProvider = {
  articles: Article[];
  addBookMarkForArticle: (id: number) => void;
  removeBookMark: (id: number) => void;
  isLoading: boolean;
};

const updateArticle = (id: number, body: Partial<Article>) =>
  fetch(`http://localhost:3000/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

const ArticlesContext = createContext<TArticleProvider>({} as TArticleProvider);

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading] = useState(false);

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
    <ArticlesContext.Provider
      value={{
        isLoading,
        addBookMarkForArticle,
        removeBookMark,
        articles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
