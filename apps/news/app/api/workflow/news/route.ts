import { uploadArticle } from "@/actions/articles/articles";
import { getCountryCodes } from "@/actions/codes/codes";
import { parseNewsFromSource } from "@/actions/parse-news/parse-news";
import { getNewsSources } from "@/actions/sources/sources";
import { News } from "@/lib/parse-source";
import { NewsSource } from "@/types/news";
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(async (context) => {
  let codes: string[] = [];
  let sources: NewsSource[] = [];
  let articles: News[] = [];
  await context.run("fetching-country-codes", async () => {
    const countryCodes = await getCountryCodes();
    if (codes.length > 0) codes = countryCodes;
  });
  await context.run("fetching-news-sources-for-country", async () => {
    if (codes.length === 0) await context.cancel();
    const newsSources: NewsSource[] = (
      await Promise.all(codes.map((code) => getNewsSources(code)))
    ).flat();
    if (newsSources.length > 0) sources = newsSources;
  });
  await context.run("retrieving-articles", async () => {
    if (sources.length === 0) await context.cancel();
    console.log("initial step ran");
    const newsArticles = (
      await Promise.all(
        sources.map((source) => parseNewsFromSource(source.country_code)),
      )
    ).flat();
    if (articles.length > 0) articles = newsArticles;
  });
  await context.run("validating-articles", async () => {
    if (articles.length === 0) await context.cancel();
    const valideArticles = [];
    for (const article of articles) {
      if (true) {
        valideArticles.push(article);
      }
    }
    console.log("second step ran");
    if (valideArticles.length > 0) articles = valideArticles;
  });
  await context.run("storing-articles", async () => {
    console.log("fourth step ran");
    if (articles.length === 0) await context.cancel();
    else await Promise.all(articles.map((article) => uploadArticle(article)));
  });
  return new Response(JSON.stringify({ articles, codes, sources }), {
    status: 200,
  });
});
