import { getPage } from "@/actions/pages";
import { Metadata } from "next";

export const pageMetadata = (id: string): Metadata => {
  const page = getPage(id);
  if (!page) {
    return {};
  }
  return {
    title: page.name,
    description: page.description,
  };
};
