import { uploadArticle } from "rest-api/articles";
import { getCountryCodes } from "rest-api/codes";
import { parseNewsFromSource } from "@/lib/parse-news";
import { getNewsSources } from "rest-api/sources";
import { NewsSource } from "rest-api/types/articles";
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(async (context) => {
  const codes = await context.run("fetching-country-codes", async () => {
    const countryCodes = await getCountryCodes();
    return countryCodes;
  });
  const sources = await context.run(
    "fetching-news-sources-for-country",
    async () => {
      if (codes.length === 0) await context.cancel();
      const newsSources: NewsSource[] = (
        await Promise.all(codes.map((code) => getNewsSources(code)))
      ).flat();
      return newsSources;
    },
  );
  const articles = await context.run("retrieving-articles", async () => {
    if (sources.length === 0) await context.cancel();
    const newsArticles = (
      await Promise.all(sources.map((source) => parseNewsFromSource(source.id)))
    ).flat();
    console.log("articles-count", newsArticles.length);
    return newsArticles;
  });
  await context.run("validating-articles", async () => {
    if (articles.length === 0) await context.cancel();
    const valideArticles = [];
    // for (const article of articles) {}
    console.log(
      "validated-articles-count",
      valideArticles.length,
      "of",
      articles.length,
    );
  });
  await context.run("storing-articles", async () => {
    console.log("about-to-store-articles", articles.length);
    if (articles.length === 0) await context.cancel();
    else await Promise.all(articles.map((article) => uploadArticle(article)));
  });
  return new Response(JSON.stringify({ articles, codes, sources }), {
    status: 200,
  });
});
