import { Logo } from "@/components/logo"
import { PlusIcon, SettingsIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Skeleton } from "mono/components/skeleton"
import { Suspense } from "react"
import Grid from "./grid"
import User from "./user"

export type SearchParams = {
  note?: string
  index?: string
}

type PageProps = {
  searchParams: SearchParams
}

const page = async ({ searchParams }: PageProps) => {
  return (
    <div className="space-y-12 w-full">
      <header className="px-8 pt-8 max-w-screen-2xl mx-auto w-full h-fit flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Logo className="size-7" />
            <span className="text-2xl font-pixel">YZ13</span>
          </div>
          <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
            <User />
          </Suspense>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline" className="rounded-full"><PlusIcon size={16} /></Button>
          <Button size="icon" variant="outline" className="rounded-full"><SettingsIcon size={16} /></Button>
        </div>
      </header>
      <Suspense fallback={<Skeleton className="w-full page-width-limit h-[calc(100dvh-128px)] mx-auto" />}>
        <Grid searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
export default page
