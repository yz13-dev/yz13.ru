import { contries } from "@/const/locale-to-country";
import chunk from "@/lib/chunk";
import { getLocaleFromCookie } from "@/lib/locale";
import dayjs from "dayjs";
import { getArticlesForCountry } from "rest-api/articles";
import AutoGrid from "./auto-grid";
import NewsChunk from "./news-chunk";

const page = async () => {
  const language = (await getLocaleFromCookie()) || "RU";
  const { data } = await getArticlesForCountry(language);
  const articles = data ?? [];
  const sliceNumber = 4;
  const chunks = chunk(articles, sliceNumber);
  const firstChunk = chunks[0];
  const restOfChunks = chunks.slice(1);
  const country = contries[language as keyof typeof contries];
  return (
    <>
      <div className="py-6 space-y-6 mt-[10%] *:px-6 max-w-4xl mx-auto">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-3xl font-medium">Сводка новостей / {country}</h1>
          <span className="lg:text-lg text-sm capitalize text-muted-foreground">
            {dayjs().locale(language).format("dddd, D MMMM")}
          </span>
        </div>
      </div>
      <div className="*:p-6 max-w-4xl mx-auto rounded-3xl bg-background divide-y">
        <NewsChunk articles={firstChunk} />
        {true && (
          <AutoGrid
            data={articles}
            defaultOffset={articles.length}
            locale={language}
          >
            {false &&
              restOfChunks.map((chunk, index) => {
                return (
                  <NewsChunk key={`chunk/#${index}`} articles={firstChunk} />
                );
              })}
          </AutoGrid>
        )}
      </div>
    </>
  );
};

export default page;
