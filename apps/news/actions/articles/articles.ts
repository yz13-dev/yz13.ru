"use server";

import { API_URL } from "@/const/api";
import { NewArticle } from "@/types/news";

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

export const getArticlesForCountry = async (country_code: string) => {
  try {
    const url = new URL(`/news/country/${country_code}/articles`, API_URL);
    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["articles", country_code],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
