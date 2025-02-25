import { parsePages } from "@/actions/parse-pages";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import { ExternalLinkIcon, HeartIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Metadata } from "next";
import Link from "next/link";
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

  const parsed = parsePages();
  const pages = parsed
    .filter((page) => {
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
    })
    .slice(0, 8);
  return (
    <>
      <Header className="border-none"></Header>
      <div className="max-w-xl w-full flex flex-col justify-end mx-auto md:h-80 h-72">
        <div className="w-full space-y-6 px-6">
          <div className="flex items-center justify-center">
            <Link href="/">
              <Logo size={{ width: 150, height: 32.5 }} type="full" />
            </Link>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <SearchInput defaultValue={search} />
            <div className="flex items-center justify-between px-2">
              <span className="text-secondary text-xs">
                Всего страниц: {parsed.length}
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
      <nav className="flex flex-row mt-32 gap-2 px-6 py-3 bg-background z-20 border-b sticky top-0">
        <Button variant="outline" size="icon">
          <HeartIcon size={16} />
        </Button>
        <Separator orientation="vertical" className="h-9" />
        <Button variant="default">Все</Button>
        <Button variant="ghost">Страницы</Button>
        <Button variant="ghost">Компоненты</Button>
      </nav>
      <PagesGrid className="w-full p-6 bg-background-secondary min-h-[calc(100dvh-61px)]">
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
    </>
  );
};

export default page;
