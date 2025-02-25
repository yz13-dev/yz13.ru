import pagesJson from "@/pages.json";

export const getPage = (id: string) => {
  return pagesJson.find((page) => page.id === id);
};
