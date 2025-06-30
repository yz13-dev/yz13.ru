import { convertToISO } from "@/lib/parse-date";
import { parseNewsFromSource } from "@/lib/parse-news";
import { serve } from "@upstash/workflow/nextjs";
import { getV1NewsCodes, getV1NewsCountryCodeArticles, getV1NewsNewsSources, postV1NewsArticlesNew, postV1NewsCacheClear } from "@yz13/api";
import { formatISO } from "date-fns";

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
    else {
      // articles.forEach((article) => {
      //   console.log("article", article);
      // });

      const formatted = articles.map((article) => {
        try {
          const published_at = new Date(article.published_at);
          console.log("published_at", article.published_at);
          console.log("published_at_parsed", convertToISO(article.published_at, true));
          console.log("fallback", formatISO(published_at))
          return {
            ...article,
            published_at: convertToISO(article.published_at, true),
          }
        } catch (error) {
          console.log("error", error);
          return article;
        }
      })

      await Promise.all(formatted.map((article) => postV1NewsArticlesNew(article)));
    }
  });

  try {
    await postV1NewsCacheClear()
  } catch (error) {
    console.log("cache-clear-error", error)
  }

  try {
    await getV1NewsCountryCodeArticles("RU")
  } catch (error) {
    console.log("re-cache-error", error)
  }

  return new Response(JSON.stringify({ articles, codes, sources }), {
    status: 200,
  });
});
