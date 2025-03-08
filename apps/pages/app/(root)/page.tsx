import Header from "@/components/header";
import { Logo } from "@/components/logo";
import { isDev } from "@/const/env";
import pagesJson from "@/pages.json";
import { PageConfig } from "@/types/page.type";
import { SidebarProvider } from "mono/components/sidebar";
import { Metadata } from "next";
import Footer from "./footer";
import PageCard from "./page.card";
import PagesGrid from "./pages-grid";
import SearchInput from "./search-input";
import AppSidebar from "./sidebar/app-sidebar";
import SortFilters from "./sort-filters";

export const metadata: Metadata = {
  title: "Pages - Библиотека страниц и компонентов",
  description: "Страницы, компоненты.",
};

type PageProps = {
  searchParams: {
    sort?: string;
    search?: string;
  };
};

const page = ({ searchParams }: PageProps) => {
  const sort = searchParams.sort;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search)
    : "";

  const publicPages = pagesJson.filter((page) => {
    if (isDev) return true;
    else return page.public;
  });
  const pages = publicPages.filter((page) => {
    if (!sort) {
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
    if (sort === "all") {
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
      if (!search) return page.type === sort;
      else if (page.type === sort) {
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
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header className="px-2 justify-start">
          <Logo size={{ width: 36, height: 36 }} type="only-icon" />
          <SearchInput
            defaultValue={search}
            className="h-9 rounded-md text-sm max-w-sm"
          />
        </Header>
        <SortFilters value={sort} />
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
      </div>
    </SidebarProvider>
  );
};

export default page;
