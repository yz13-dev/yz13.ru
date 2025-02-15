import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import Footer from "../old/footer";
import Column from "./grid/column";
import Wrapper from "./grid/wrapper";

const loading = () => {
  return (
    <>
      <Header className="h-[80px]">
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          <Skeleton className="size-9" />
        </Nav>
      </Header>
      <div className="w-full divide-y border-b">
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x flex items-center p-6">
              <Skeleton className="h-5 w-full rounded-md" />
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <Wrapper>
              <Column className="divide-y *:overflow-hidden">
                <div className="w-full h-2/3 aspect-[9/12] hover:bg-background-back flex flex-col items-center p-6 relative">
                  <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                </div>
                <div className="w-full h-1/3 p-6 hover:bg-background-back space-x-3">
                  <span className="text-xl font-medium">
                    Проекты с открытым кодом.
                  </span>
                  <span className="text-xl font-medium text-secondary">
                    Скоро.
                  </span>
                </div>
              </Column>
              <Column className="gap-3 p-6">
                <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
              </Column>
              <Column className="divide-y *:overflow-hidden">
                <div className="w-full h-1/3 p-6 hover:bg-background-back space-x-3 relative">
                  <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                </div>
                <div className="w-full h-2/3 aspect-[9/10] gap-3 hover:bg-background-back flex flex-col items-center p-6 relative">
                  <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                </div>
              </Column>
            </Wrapper>
            <div className="w-full h-full pattern-lines" />
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
