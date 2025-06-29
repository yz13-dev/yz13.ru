import { parseNewsFromSource } from "@/lib/parse-news";
import { serve } from "@upstash/workflow/nextjs";
import { getV1NewsCodes, getV1NewsCountryCodeArticles, getV1NewsNewsSources, postV1NewsArticlesNew, postV1NewsCacheClear } from "@yz13/api";

export const { POST } = serve(async (context) => {
  const codes = await context.run("fetching-country-codes", async () => {
    const data = await getV1NewsCodes();
    return data ?? [];
  });
  const sources = await context.run(
    "fetching-news-sources-for-country",
    async () => {
      if (codes.length === 0) await context.cancel();
      const newsSources = (
        await Promise.all(codes.map((code) => getV1NewsNewsSources({ country_code: code })))
      )
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
    else await Promise.all(articles.map((article) => postV1NewsArticlesNew(article, { headers: { Authorization: `Bearer ` } })));
  });

  await postV1NewsCacheClear()

  await getV1NewsCountryCodeArticles("RU")

  return new Response(JSON.stringify({ articles, codes, sources }), {
    status: 200,
  });
});
