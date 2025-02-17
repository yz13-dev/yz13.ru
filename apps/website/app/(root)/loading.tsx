import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import Footer from "../old/footer";
import Hero from "./hero";
import TechList from "./tech-list";

export const ServicesSkeleton = () => {
  return (
    <div className="w-full">
      <div className="max-w-screen-2xl w-full mx-auto border-x">
        <div className="h-fit flex items-center divide-x xl:!grid flex xl:!grid-cols-3 xl:!grid-rows-1 flex-col">
          <div className="relative w-full h-full col-span-2 bg-neutral-100">
            <Skeleton className="aspect-video rounded-none" />
          </div>
          <div className="w-full flex flex-col h-full justify-between">
            <div className="relative w-full space-y-3 p-3 h-full pattern-lines">
              <Skeleton className="w-full h-[58px]" />
              <Skeleton className="w-full h-[58px]" />
              <Skeleton className="w-full h-[58px]" />
              <Skeleton className="w-full h-[80px]" />
            </div>
            <div className="w-full flex items-center gap-3 p-3 bg-neutral-100 border-t">
              <Button className="w-1/2" variant="default">
                Все услуги
              </Button>
              <Button className="w-1/2" variant="secondary">
                Заказать услугу
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const loading = () => {
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          <Skeleton className="size-9" />
          <Skeleton className="h-9 w-[75px]" />
        </Nav>
      </Header>
      <div className="w-full divide-y border-b">
        <Hero />
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x px-6 py-3">
              <Skeleton className="h-5 w-full rounded-md" />
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <ServicesSkeleton />
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-fit divide-y">
              <div className="flex flex-col gap-2 bg-neutral-100 p-6">
                <span className="text-foreground/80 text-2xl block font-medium">
                  Доступные технологии для разработки
                </span>
                <span className="text-secondary text-sm">
                  Со временем список технологий будет расширяться
                </span>
              </div>
              <TechList className="p-6 bg-neutral-100" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-20" />
          </div>
        </div>
        <Skeleton className="h-[386px] w-full rounded-none" />
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-20" />
          </div>
        </div>
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-fit p-6 space-y-6">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default loading;
