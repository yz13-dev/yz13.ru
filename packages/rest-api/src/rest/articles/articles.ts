"use server";

import { API_URL } from "../../const/api";
import { Article, NewArticle } from "../../types/articles";

export const uploadArticle = async (article: NewArticle) => {
  try {
    const url = new URL("/news/articles/new", API_URL);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = process.env.NEWS_API_TOKEN;
    if (token) headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(article),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getArticlesForCountry = async (
  country_code: string,
  offset: number = 0,
): Promise<Article[]> => {
  try {
    const url = new URL(`/news/country/${country_code}/articles`, API_URL);
    const searchParams = url.searchParams;
    if (typeof offset !== "undefined")
      searchParams.append("offset", offset.toString());
    else searchParams.append("offset", "0");
    console.log(url.toString());
    const response = await fetch(url.toString(), {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
