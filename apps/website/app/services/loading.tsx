import { Logo } from "@/components/logo";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import Header from "../(root)/header";
import Nav from "../(root)/nav";
import Footer from "../old/footer";

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
            <div className="w-full grid md:!grid-cols-3 border-x divide-y divide-x sm:!grid-cols-2 grid-cols-1 !pb-0">
              <div className="w-full divide-y h-full flex md:!col-span-1 col-span-full flex-col *:overflow-hidden *:transition-colors">
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
              </div>
              <div className="w-full h-full aspect-[9/12] gap-3 hover:bg-background-back flex flex-col items-center p-6 relative overflow-hidden *:transition-colors">
                <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
              </div>
              <div className="w-full divide-y h-full flex md:!col-span-1 col-span-full flex-col *:overflow-hidden *:transition-colors">
                <div className="w-full h-1/3 p-6 hover:bg-background-back space-x-3 relative">
                  <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                </div>
                <div className="w-full h-2/3 aspect-[9/10] gap-3 hover:bg-background-back flex flex-col items-center p-6 relative">
                  <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                </div>
              </div>
            </div>
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
