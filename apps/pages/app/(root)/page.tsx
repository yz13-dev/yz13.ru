import Header from "@/components/header";
import { Logo } from "@/components/logo";
import { isDev } from "@/const/env";
import pagesJson from "@/pages.json";
import { PageConfig } from "@/types/page.type";
import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import FiltersBar from "./filters-bar";
import Footer from "./footer";
import PageCard from "./page.card";
import PagesGrid from "./pages-grid";
import SearchInput from "./search-input";

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
      <Header className="border-none"></Header>
      <div className="max-w-xl w-full flex flex-col justify-end mx-auto md:h-80 h-72">
        <div className="w-full space-y-6 px-6">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={{ width: 156, height: 36 }} type="full" />
            </Link>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <SearchInput defaultValue={search} />
            <div className="flex items-center justify-between px-2">
              <span className="text-secondary text-xs">
                Всего страниц: {publicPages.length}
              </span>
              <Link
                target="_blank"
                href="https://yz13.ru"
                className="text-secondary hover:underline text-xs flex items-center gap-1"
              >
                yz13.ru
                <ExternalLinkIcon size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

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
