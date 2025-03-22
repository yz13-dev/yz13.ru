"use server";

import { API_URL } from "@/const/api";
import { News } from "@/lib/parse-source";

export const uploadArticle = async (article: News) => {
  try {
    const url = new URL("/news/articles/new", API_URL);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
