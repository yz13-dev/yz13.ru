"use client";
import { CalendarLocale } from "@/const/locale-to-country";
import { chunk } from "@/lib/chunk";
import "dayjs/locale/ru";
import { Loader2Icon } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getArticlesForCountry } from "rest-api/articles";
import { Article } from "rest-api/types/articles";
import NewsChunk from "./news-chunk";

type AutoGridProps = {
  locale?: string;
  data?: Article[];
  defaultOffset?: number;
  offsetStep?: number;
  className?: string;
  children?: React.ReactNode;
};
const AutoGrid = ({
  locale = "RU",
  data = [],
  offsetStep = 30,
  children,
  className = "",
  defaultOffset = 0,
}: AutoGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(defaultOffset);
  const [articles, setArticles] = useState<Article[][]>(chunk(data, 4));
  const [isAll, setIsAll] = useState<boolean>(false);
  const inView = useInView(ref);
  const [loading, setLoading] = useState<boolean>(false);
  const handleNewArticles = async () => {
    if (!inView) return;
    setLoading(true);
    try {
      const newOffset = offset + offsetStep;
      const { data: articles } = await getArticlesForCountry(locale, newOffset);
      const newArticles = articles ?? [];
      const filteredArticles = newArticles.filter((article) => {
        const result = data.find((item) => item.id === article.id);
        return result === undefined;
      });
      if (filteredArticles.length === 0) setIsAll(true);
      else {
        setOffset(newOffset);
        const newChunks = chunk(filteredArticles, 4);
        setArticles((prev) => [...prev, ...newChunks]);
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
    <>
      {children}
      {articles.map((chunk, index) => {
        return (
          <NewsChunk
            key={`auto-grid/chunk/#${index}`}
            articles={chunk}
            locale={locale.toLowerCase() as CalendarLocale}
          />
        );
      })}
      {/* {articles.map((news, index) => {
        return <NewsCard key={`${news.id}/${index}`} news={news} className={className} />;
      })} */}
      {loading && (
        <div className="w-full col-span-full flex items-center gap-2 justify-center">
          <Loader2Icon size={18} className="text-foreground animate-spin" />
          <span className="text-sm text-foreground">Подгружаем новости...</span>
        </div>
      )}
      {isAll && (
        <div className="w-full col-span-full py-6 flex justify-center">
          <span className="text-sm text-muted-foreground">
            Вы дошли до конца списка
          </span>
        </div>
      )}
      {!isAll && <div ref={ref} className="w-full h-px col-span-full" />}
    </>
  );
};

export default AutoGrid;
