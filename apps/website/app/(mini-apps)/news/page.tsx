import { HeaderSkeleton } from "@/components/header";
import { ThemeImage } from "@/components/theme-image";
import { Skeleton } from "@yz13/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Last, { LastSkeleton } from "./components/last";
import Recent, { RecentSkeleton } from "./components/recent";
const Header = dynamic(() => import("@/components/header"), {
  loading: () => <Skeleton className="w-full h-16 rounded-none" />
})
export default function News() {

  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <div className="container mx-auto px-6">
        <div className="w-full md:pt-32 pt-24 md:pb-16 pb-12">
          <div className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card flex items-center justify-center">
            <ThemeImage
              className="relative"
              srcDark="/projects/news/logo/dark.png"
              srcLight="/projects/news/logo/light.png"
              width={96}
              height={96}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="w-full container px-6 mx-auto h-fit py-6 space-y-12">
        <div className="*:block max-w-4xl space-y-4">
          <h1 className="text-6xl block font-medium">Новостная лента</h1>
        </div>
      </div>

      <section className="space-y-4 container mx-auto p-6">
        <Suspense fallback={<RecentSkeleton />}>
          <Recent />
        </Suspense>
      </section>
      <section className="container mx-auto px-6 pb-6">
        <div className="py-6">
          <h3 className="text-2xl font-medium">Последние новости</h3>
        </div>
        <Suspense fallback={<LastSkeleton />}>
          <Last />
        </Suspense>
      </section>
    </>
  )
}
