import { parsePages } from "@/actions/parse-pages";
import { Logo } from "@/components/logo";
import { Typewriter } from "@/components/text-writter";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import PageCard from "./page.card";
import PagesGrid from "./pages-grid";

const page = () => {
  const pages = parsePages();
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
          <p className="lg:!text-7xl md:!text-5xl text-3xl font-medium text-secondary">
            Небольшая библиотека, которая со временем будет только расти.
          </p>
        </div>
      </div>
      <div className="w-full h-fit border-b">
        <div className="container mx-auto border-x w-full p-6">
          <PagesGrid>
            {pages.map((page) => {
              return <PageCard key={page.id} page={page} />;
            })}
          </PagesGrid>
        </div>
      </div>
    </>
  );
};

export default page;
