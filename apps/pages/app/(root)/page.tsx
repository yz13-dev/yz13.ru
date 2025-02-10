import { parsePages } from "@/actions/parse-pages";
import { Logo } from "@/components/logo";
import { Typewriter } from "@/components/text-writter";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Metadata } from "next";
import Link from "next/link";
import PageCard from "./page.card";
import PagesGrid from "./pages-grid";

export const metadata: Metadata = {
  title: "Pages - Библиотека страниц и компонентов",
  description: "Страницы, компоненты.",
};

type PageProps = {
  searchParams: {
    type?: string;
  };
};

const page = ({ searchParams }: PageProps) => {
  const type = searchParams.type;
  const pages = parsePages().filter((page) => {
    if (!type) return true;
    if (type === "all") return true;
    else return page.type === type;
  });
  return (
    <>
      <div className="w-full h-16 border-b">
        <header className="container border-x mx-auto w-full h-full px-6 flex items-center justify-between">
          <Link href="/">
            <Logo size={{ width: 96, height: 18 }} type="full" />
          </Link>
          <Button className="gap-2" asChild>
            <Link href="https://yz13.ru">
              <span>yz13.ru</span>
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </header>
      </div>
      <div className="w-full h-fit border-b">
        <div className="container mx-auto border-x w-full lg:!py-12 py-6 px-6 space-y-4">
          <Typewriter
            text={["Страницы, компоненты.", "Pages"]}
            speed={100}
            loop={true}
            tag="h1"
            className="lg:!text-7xl md:!text-5xl text-3xl font-medium block"
          />
          <p className="lg:!text-5xl md:!text-3xl text-xl font-medium text-secondary">
            Библиотека, которая со временем будет только расти.
          </p>
        </div>
      </div>
      <div className="w-full h-fit border-b">
        <div className="container mx-auto border-x w-full px-6 py-3">
          <nav className="flex flex-row gap-4">
            <Button
              variant={type === "all" || !type ? "secondary" : "ghost"}
              asChild
            >
              <Link href="?type=all">Все</Link>
            </Button>
            <Button variant={type === "page" ? "secondary" : "ghost"} asChild>
              <Link href="?type=page">Страницы</Link>
            </Button>
            <Button
              variant={type === "component" ? "secondary" : "ghost"}
              asChild
            >
              <Link href="?type=component">Компоненты</Link>
            </Button>
          </nav>
        </div>
      </div>
      <div className="w-full h-fit border-b">
        <div className="container mx-auto border-x w-full p-6">
          <PagesGrid>
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
      </div>
      <div className="w-full h-fit border-b">
        <div className="container mx-auto border-x w-full px-6 py-3">
          <footer className="flex flex-row gap-4 justify-between items-center">
            <span className="text-xs text-secondary">© 2025 Pages</span>
            <span className="text-xs text-secondary">YZ13/Pages</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default page;
