"use server";

import { customFetch } from "@/const/fetch";
import { Article, NewArticle } from "@/types/articles";

export const uploadArticle = async (article: NewArticle) => {
  const token = process.env.NEWS_API_TOKEN;
  return await customFetch<Article | null>("/news/articles/new", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
};

export const getArticlesForCountry = async (
  country_code: string,
  offset: number = 0,
) => {
  return await customFetch<Article[]>(
    `/news/country/${country_code}/articles?offset=${offset}`,
    {
      method: "GET",
    },
  );
};
