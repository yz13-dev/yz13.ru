import { AvailabilitySkeleton } from "@/components/availability";
import { Logo } from "@/components/logo";
import { cn } from "@yz13/ui/cn";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { CallToActionSkeleton } from "./components/call-to-action";

export default function loading() {
  return (
    <>
      <header className="w-full h-16 flex items-center">
        <div className="max-w-screen-2xl px-6 w-full mx-auto h-fit flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo type="full" size={24} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-16" />
          </div>
        </div>
      </header>
      <div className="py-8 h-[calc(100dvh-64px)]">
        <div className="w-full h-16 justify-center items-center flex">
          <AvailabilitySkeleton />
        </div>
        <main className="w-full max-w-5xl mx-auto h-[calc(100%-64px)] flex flex-col gap-20 justify-center items-center">
          <div className="px-6 space-y-8">
            <div className="flex md:flex-row flex-col justify-center items-center gap-6">
              <div className="size-[148px] lg:flex hidden aspect-square items-center justify-center">
                <Logo size={148} />
              </div>
              <div className="size-[96px] lg:hidden flex aspect-square items-center justify-center">
                <Logo size={96} />
              </div>
              <h1 className="lg:text-9xl text-7xl text-center font-bold">YZ13</h1>
            </div>
            <p className="lg:text-4xl text-2xl block max-w-3xl w-full text-center font-medium text-muted-foreground">
              Фронтенд разработчик, специализируюсь на разработке сайтов, веб-приложений.
            </p>
          </div>

          <div className={cn(
            "flex lg:flex-row flex-col w-full items-center justify-center gap-6 px-6",
          )}>
            <CallToActionSkeleton className="lg:w-fit w-full lg:*:w-fit *:w-full" />
          </div>
        </main>
      </div>
    </>
  );
}
