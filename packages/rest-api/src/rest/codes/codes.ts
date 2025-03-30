"use server";

import { API_URL } from "../../const/api";

export const getCountryCodes = async (): Promise<string[]> => {
  try {
    const url = new URL("/news/codes", API_URL);
    const response = await fetch(url.toString());
    const data = await response.json();
    return data as string[];
  } catch (error) {
    return [];
  }
};
