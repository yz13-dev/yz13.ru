import { getNewsV1Last } from "@yz13/api";
import ArticleCard, { ArticleCardSkeleton } from "./article-card";
import AutoList from "./auto-list";



export default async function Last() {

  const last = await getNewsV1Last();

  return (
    <div className="*:py-6">
      <AutoList defaultOffset={last.length - 1} defaultArticles={last}>
        {
          last
            .map(article => {

              return <ArticleCard key={article.id} article={article} />
            })
        }
      </AutoList>
    </div>
  )
}

export const LastSkeleton = () => {
  return (
    <div className="*:py-6">
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </div>
  )
}
