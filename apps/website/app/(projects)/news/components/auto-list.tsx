"use client";
import { getNewsV1Last } from "@yz13/api";
import type { GetNewsV1Last200Item } from "@yz13/api/types";
import { Loader2Icon } from "@yz13/ui/icons";
import { useDebounceEffect } from "ahooks";
import { useInView } from "motion/react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { type ReactNode, useRef, useState } from "react";
import ArticleCard from "./article-card";


type Props = {
  defaultOffset?: number
  defaultArticles?: GetNewsV1Last200Item[]
  children: ReactNode
}
export default function AutoList({ children, defaultArticles = [], defaultOffset = 0 }: Props) {
  const [date] = useQueryState("date", parseAsIsoDate)

  const ref = useRef<HTMLDivElement>(null)

  const [articles, setArticles] = useState<GetNewsV1Last200Item[]>(defaultArticles);
  const [offset, setOffset] = useState<number>(defaultOffset);

  const [isAll, setIsAll] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const inView = useInView(ref);

  const handleNewArticles = async () => {
    if (!inView) return;
    setLoading(true);
    try {

      const newOffset = offset + 10;

      console.log("newOffset", newOffset)

      const articles = await getNewsV1Last({
        offset: String(newOffset),
      })

      const newArticles = articles ?? [];
      if (newArticles.length === 0) setIsAll(true);
      else {
        setOffset(newOffset);

        const onlyNew = newArticles.filter(article => articles.some(oldArticle => oldArticle.id === article.id))

        setArticles((prev) => [...prev, ...onlyNew]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useDebounceEffect(() => {
    if (inView) handleNewArticles();
  }, [inView, date, offset, articles], { wait: 250 });
  return (
    <>
      {children}
      {
        articles.map((article) => {
          return <ArticleCard key={article.id} article={article} />
        })
      }
      {loading && (
        <div className="w-full py-6 col-span-full flex items-center gap-2 justify-center text-muted-foreground">
          <Loader2Icon size={18} className="animate-spin" />
          <span className="text-sm">Подгружаем новости...</span>
        </div>
      )}
      {isAll && (
        <div className="w-full col-span-full py-6 flex justify-center">
          <span className="text-sm text-muted-foreground">
            Вы дошли до конца списка
          </span>
        </div>
      )}
      {!isAll && <div ref={ref} className="w-full h-px" />}
    </>
  )
}
