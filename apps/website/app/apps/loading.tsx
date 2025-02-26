import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { abc } from "./empty";

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
      <div className="w-full">
        <div className="max-w-screen-2xl w-full mx-auto border-x">
          {abc.map((letter, index) => {
            return (
              <div key={letter} className="flex flex-col gap-2 p-6">
                <span className="text-xl font-medium capitalize">{letter}</span>
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default loading;
