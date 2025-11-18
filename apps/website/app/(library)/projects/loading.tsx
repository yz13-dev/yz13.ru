import { Skeleton } from "@yz13/ui/skeleton";
import dynamic from "next/dynamic";
import LogoGrid from "../components/logo-grid";
const Footer = dynamic(() => import("@/components/footer"));


const Header = dynamic(() => import("@/components/header"), {
  loading: () => <Skeleton className="w-full h-16 rounded-none" />
})


export default function Loading() {
  return (
    <>
      <Header />

      <LogoGrid>
        <Skeleton className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card" />
        <Skeleton className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card" />
        <Skeleton className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card" />
        <Skeleton className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card" />
        <Skeleton className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card" />
      </LogoGrid>

      <div className="w-full container px-6 mx-auto h-fit py-6 space-y-12">
        <div className="*:block max-w-4xl space-y-4">
          <h1 className="text-6xl block font-medium">Проекты</h1>
          <p className="text-4xl text-muted-foreground">Личные проекты, разработанные в прошлом или находящиеся в разработке</p>
        </div>
        <div className="pt-6 flex items-center gap-2">
          <Skeleton className="w-full max-w-md h-9" />
          <Skeleton className="w-28 h-9" />
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      <Footer />

    </>
  )
}
