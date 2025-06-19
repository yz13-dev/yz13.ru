import { parseNewsFromSource } from "@/lib/parse-news";
import { serve } from "@upstash/workflow/nextjs";
import { clearNewsCache, getArticlesForCountry, getCountryCodes, uploadArticle } from "@yz13/api/articles";
import { getNewsSources } from "@yz13/api/sources";

export const { POST } = serve(async (context) => {
  const codes = await context.run("fetching-country-codes", async () => {
    const { data } = await getCountryCodes();
    return data ?? [];
  });
  const sources = await context.run(
    "fetching-news-sources-for-country",
    async () => {
      if (codes.length === 0) await context.cancel();
      const newsSources = (
        await Promise.all(codes.map((code) => getNewsSources(code)))
      )
        .map((sources) => (sources.data ?? []).flat())
        .flat();
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

  await clearNewsCache()

  await getArticlesForCountry("RU")

  return new Response(JSON.stringify({ articles, codes, sources }), {
    status: 200,
  });
});
