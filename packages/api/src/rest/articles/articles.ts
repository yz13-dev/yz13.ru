"use server";

import { customFetch } from "@/const/fetch";
import { Article, NewArticle } from "@/types/articles";
import { format } from "date-fns";

export const getCountryCodes = async () => {
  return await customFetch<string[]>("/news/codes", {
    method: "GET",
  });
};

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
  date: string = format(new Date(), "yyyy-MM-dd"),
) => {
  const searchParams = new URLSearchParams({
    offset: offset.toString(),
    date: date,
  });
  return await customFetch<Article[]>(
    `/news/country/${country_code}/articles?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );
};

export const getArticles = async (offset: number = 0) => {
  return await customFetch<Article[]>(`/news/articles?offset=${offset}`, {
    method: "GET",
  });
};

export const getArticle = async (article_id: string) => {
  return await customFetch<Article | null>(`/news/article/${article_id}`, {
    method: "GET",
  });
};

export const clearNewsCache = async () => {
  return await customFetch<boolean>("/news/cache/clear", {
    method: "POST",
  });
};
