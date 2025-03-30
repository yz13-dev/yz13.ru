import { getArticlesForCountry } from "rest-api/articles";
import { contries } from "@/const/locale-to-country";
import { getLocaleFromCookie } from "@/lib/locale";
import { Separator } from "mono/components/separator";
import { SidebarTrigger } from "mono/components/sidebar";
import AutoGrid from "./auto-grid";
import NewsCard from "./news-card";

const page = async () => {
  const language = getLocaleFromCookie() || "RU";
  const articles = await getArticlesForCountry(language);
  const sliceNumber = 4;
  const firstRow = articles.slice(0, sliceNumber);
  const restOfArticles = articles.slice(sliceNumber);
  const country = contries[language as keyof typeof contries];
  return (
    <>
      <div className="w-full p-6 flex items-center gap-2">
        <SidebarTrigger></SidebarTrigger>
        <h1 className="text-2xl font-semibold">
          Агрегатор новостей / {country}
        </h1>
      </div>
      <div className="w-full min-h-96 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-6">
        {firstRow.map((news) => {
          return <NewsCard key={news.id} news={news} showThumbnail />;
        })}
      </div>
      <Separator />
      <div className="w-full p-6">
        <h3 className="text-2xl font-semibold">
          Последние новости / {country}
        </h3>
      </div>
      <AutoGrid
        data={articles}
        defaultOffset={articles.length}
        locale={language}
      >
        {restOfArticles.map((news) => {
          return <NewsCard key={news.id} news={news} />;
        })}
      </AutoGrid>
    </>
  );
};

export default page;
