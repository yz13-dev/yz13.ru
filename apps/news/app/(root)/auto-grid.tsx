"use client";
import { getArticlesForCountry } from "rest-api/articles";
import { Article } from "rest-api/types/articles";
import "dayjs/locale/ru";
import { Loader2Icon } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import NewsCard from "./news-card";

type AutoGridProps = {
  locale?: string;
  data?: Article[];
  defaultOffset?: number;
  offsetStep?: number;
  children?: React.ReactNode;
};
const AutoGrid = ({
  locale = "RU",
  offsetStep = 30,
  children,
  data = [],
  defaultOffset = 0,
}: AutoGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(defaultOffset);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isAll, setIsAll] = useState<boolean>(false);
  const inView = useInView(ref);
  const [loading, setLoading] = useState<boolean>(false);
  const handleNewArticles = async () => {
    if (!inView) return;
    setLoading(true);
    try {
      const newOffset = offset + offsetStep;
      const newArticles = await getArticlesForCountry(locale, newOffset);
      if (newArticles.length === 0) setIsAll(true);
      else {
        setOffset(newOffset);
        setArticles((prev) => [...prev, ...newArticles]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (inView) handleNewArticles();
  }, [inView]);
  return (
    <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-6">
      {children}
      {articles.map((news, index) => {
        return <NewsCard key={news.id} news={news} />;
      })}
      {loading && (
        <div className="w-full col-span-full flex items-center gap-2 justify-center">
          <Loader2Icon size={18} className="text-secondary animate-spin" />
          <span className="text-sm text-secondary">Подгружаем новости...</span>
        </div>
      )}
      {isAll && (
        <div className="w-full col-span-full py-6 flex justify-center">
          <span className="text-sm text-secondary">
            Вы дошли до конца списка
          </span>
        </div>
      )}
      {!isAll && <div ref={ref} className="w-full h-px col-span-full" />}
    </div>
  );
};

export default AutoGrid;
