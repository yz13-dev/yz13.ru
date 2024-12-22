import { Logo } from "@/components/logo"
import User from "@/components/user"
import { ArrowRightIcon, BriefcaseBusinessIcon, EllipsisIcon, GlobeIcon } from "lucide-react"
import { Button } from "mono/components/button"
import dynamic from "next/dynamic"
import RoleSelection from "./role-selection"
import SocialsBlock from "./socials-block"
const LiveDate = dynamic(() => import("./workspace/live-date"), {
  ssr: false,
  loading: () => <span className="text-base font-medium text-secondary">August, 13 2001</span>
})
const page = () => {
  return (
    <>
      <header className="w-full max-w-4xl mx-auto mt-24 h-16 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-9" />
          <span className="font-pixel text-2xl">YZ13</span>
        </div>
        <div className="flex items-center gap-2">
          <User />
        </div>
      </header>
      <div
        className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6"
      >
        <section className="w-full flex flex-col-reverse gap-3">
          <div className="w-fit space-y-3">
            <p className="text-sm text-secondary">
              Just frontend developer, nothing crazy.
            </p>
            <SocialsBlock />
          </div>
        </section>
        <section className="w-full space-y-3">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-sm inline-flex items-center gap-2"><BriefcaseBusinessIcon size={16} /> Works</h3>
            <Button className="rounded-full size-6 p-0" size="icon" variant="ghost">
              <ArrowRightIcon size={14} />
            </Button>
          </div>
          <div className="grid w-full gap-3 lg:!grid-cols-3 sm:grid-cols-2 grid-cols-1">

            <RoleSelection className="w-full" />

            <div className="w-full rounded-xl p-1 space-y-1 border">
              <div className="w-full rounded-xl bg-yz-neutral-100 hover:bg-yz-neutral-200 border border-transparent hover:border-yz-neutral-300 aspect-[16/10]"></div>
              <div className="flex flex-col gap-2 p-1">
                <div className="w-full flex items-center gap-2">
                  <GlobeIcon size={16} />
                  <span className="text-sm">Website</span>
                </div>
                <div className="w-full flex items-center justify-between pl-6 gap-2">
                  <span className="text-xs text-secondary">Updated years ago</span>
                  <EllipsisIcon size={16} />
                </div>
              </div>
            </div>

            <div className="w-full rounded-xl p-1 space-y-1 border">
              <div className="w-full rounded-xl bg-yz-neutral-100 hover:bg-yz-neutral-200 border border-transparent hover:border-yz-neutral-300 aspect-[16/10]"></div>
              <div className="flex flex-col gap-2 p-1">
                <div className="w-full flex items-center gap-2">
                  <GlobeIcon size={16} />
                  <span className="text-sm">Website</span>
                </div>
                <div className="w-full flex items-center justify-between pl-6 gap-2">
                  <span className="text-xs text-secondary">Updated years ago</span>
                  <EllipsisIcon size={16} />
                </div>
              </div>
            </div>

          </div>

        </section>
      </div>
    </>
  )
}

export default page
