import { Skeleton } from "mono/components/skeleton";
import { RootHeaderSkeleton } from "./header";

export default function Loading() {
  return (
    <>
      <div className="w-full">
        <RootHeaderSkeleton />
        <main className="w-full relative flex flex-col justify-between h-[calc(100dvh-56px)]">
          <div className="w-full h-fit space-y-10 md:p-[2.5%] p-[5%]">
            <div className="w-full *:max-w-4xl space-y-6 *:block *:lg:text-5xl *:md:text-4xl *:text-3xl">
              <h1 className="text-foreground font-semibold">
                YZ13 - Фронтенд разработчик
              </h1>
              <p className="text-secondary font-medium text-balance">
                Специализируюсь на разработке сайтов, веб-приложений. Увлекаюсь
                разработкой интерфейсов для сайтов и приложений.
              </p>
            </div>
          </div>
          <div className="w-full space-y-5 md:space-y-10">
            <div className="w-full max-w-dvw md:px-[2.5%] px-[5%] h-fit">
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
            <Skeleton className="w-full max-w-dvw h-20 px-6 pb-2 rounded-none background-transition-to-b" />
          </div>
        </main>
      </div>
    </>
  );
}
