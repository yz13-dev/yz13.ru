import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import { Skeleton } from "mono/components/skeleton";
import { TabsContent } from "mono/components/tabs";
import { cn } from "yz13/cn";
import Stack from "./stack";
import NavTabs, { TabsWrapper } from "./tabs";

export default function Loading() {
  return (
    <>
      <div
        className={cn(
          "w-full divide-x flex lg:flex-row flex-col overflow-y-auto",
          "lg:*:w-1/2 *:w-full lg:h-dvh h-fit *:h-full",
        )}
      >
        <main className="sticky top-0 flex flex-col items-center justify-between">
          <div className="w-full yz-future-container yz-future-container-max my-auto mx-auto space-y-10 p-[5%]">
            <Logo size={{ width: 140, height: 26 }} type="full" />
            <div
              style={{ lineHeight: 1.2 }}
              className="w-fit lg:text-5xl text-3xl pr-[7.5%] *:font-semibold *:text-pretty"
            >
              <h1 className="inline text-foreground">YZ13</h1>
              <span className="text-muted-foreground inline"> - </span>
              <p className="text-muted-foreground inline">
                Фронтенд разработчик, специализируюсь на разработке сайтов,
                веб-приложений.
              </p>
            </div>
            <div className="yz-future-padding-y">
              <Skeleton className="h-9 w-full max-w-lg" />
            </div>
          </div>
          <div className="w-full h-20">
            <Skeleton className="w-full yz-future-container rounded-none yz-future-container-max mx-auto h-20" />
          </div>
        </main>
        <div className="">
          <TabsWrapper className="yz-future-container-no-padding yz-future-container-max mx-auto bg-background backdrop-blur-sm pt-[2.5%] space-y-6">
            <div className="w-full h-14 flex items-center justify-between yz-future-padding-x bg-background sticky top-0 z-10">
              <NavTabs />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-[75px]" />
              </div>
            </div>
            <TabsContent value="/">
              <div className="w-full space-y-5 md:space-y-10 yz-future-padding-x yz-future-padding-y">
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
              <div className="space-y-12">
                <div className="w-full space-y-6 yz-future-padding-x">
                  <span className="text-3xl block font-semibold">Стэк</span>
                  <Stack />
                </div>
                <div className="w-full space-y-6 yz-future-padding-x">
                  <span className="text-3xl block font-semibold">Услуги</span>
                  <div className="md:gap-[2.5%] gap-[5%] divide-y space-y-6 *:pb-6">
                    <Skeleton className="h-[475px] w-full rounded-none" />
                  </div>
                </div>
              </div>
              <Footer />
            </TabsContent>
          </TabsWrapper>
        </div>
      </div>
    </>
  );
}
