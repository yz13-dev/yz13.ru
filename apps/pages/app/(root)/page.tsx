import { isDev } from "@/const/env";
import pagesJson from "@/pages.json";
import { PageConfig } from "@/types/page.type";
import { Metadata } from "next";
import FiltersBar from "./filters-bar";
import Footer from "./footer";
import PageCard from "./page.card";
import PagesGrid from "./pages-grid";
import SearchSection from "./search-section";

export const metadata: Metadata = {
  title: "Pages - Библиотека страниц и компонентов",
  description: "Страницы, компоненты.",
};

type PageProps = {
  searchParams: {
    type?: string;
    search?: string;
  };
};

const page = ({ searchParams }: PageProps) => {
  const type = searchParams.type;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search)
    : "";

  const publicPages = pagesJson.filter((page) => {
    if (isDev) return true;
    else return page.public;
  });
  const pages = publicPages.filter((page) => {
    if (!type) {
      if (!search) return true;
      else {
        const isMatchInName = page.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const isMatchInDescription = page.description
          ?.toLowerCase()
          .includes(search.toLowerCase());
        return isMatchInName || isMatchInDescription;
      }
    }
    if (type === "all") {
      if (!search) return true;
      else {
        const isMatchInName = page.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const isMatchInDescription = page.description
          ?.toLowerCase()
          .includes(search.toLowerCase());
        return isMatchInName || isMatchInDescription;
      }
    } else {
      if (!search) return page.type === type;
      else if (page.type === type) {
        const isMatchInName = page.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const isMatchInDescription = page.description
          ?.toLowerCase()
          .includes(search.toLowerCase());
        return isMatchInName || isMatchInDescription;
      } else return false;
    }
  }) as PageConfig[];
  return (
    <>
      {/* <Header className="border-none"></Header> */}
      <SearchSection count={pages.length} search={search} />
      <FiltersBar
        type={type}
        className="mt-32 bg-background border-b z-20 sticky top-0"
      />
      <div className="min-h-[calc(100dvh-61px)] bg-background-secondary w-full">
        <PagesGrid className="w-full p-6 h-full">
          {pages.length === 0 ? (
            <div className="w-full col-span-full h-full flex items-center justify-center">
              <span className="text-secondary">Нет страниц</span>
            </div>
          ) : (
            pages.map((page) => {
              return <PageCard key={page.id} page={page} />;
            })
          )}
        </PagesGrid>
      </div>
      <Footer />
    </>
  );
};

export default page;
