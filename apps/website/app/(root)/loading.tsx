import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import Hero from "./hero";

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
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-fit flex items-center divide-x xl:!grid flex xl:!grid-cols-3 xl:!grid-rows-1 flex-col">
              <div className="relative w-full h-full col-span-2 p-3 bg-neutral-100">
                <Skeleton className="aspect-video" />
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
      </div>
    </>
  );
};
export default loading;
