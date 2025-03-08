import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { abc } from "./empty";

const loading = () => {
  return (
    <>
      <Header className="sticky top-0">
        <Nav side="left">
          <Link href="/">
            <Logo size={{ width: 110, height: 20 }} type="full" />
          </Link>
        </Nav>
        <div className="flex items-center gap-2">
          <Skeleton className="size-9" />
          <Skeleton className="h-9 w-[75px]" />
        </div>
      </Header>
      <div className="w-full divide-y border-b">
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="lg:!h-20 h-10 border-x p-6 space-y-6" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        {abc.map((letter, index) => {
          return (
            <div key={letter} className="w-full">
              <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="flex flex-col gap-2 p-6 border-x">
                  <span className="text-xl font-medium capitalize">
                    {letter}
                  </span>
                  <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 *:h-20">
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />

                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                  </div>
                </div>
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default loading;
