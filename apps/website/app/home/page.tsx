import { Logo } from "@/components/logo"
import User from "@/components/user"
import { ClockIcon, MailIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import ContentSection from "./content-section"
import HeroSection from "./hero-section"
const LiveTime = dynamic(() => import("./live-time"), {
  ssr: false
})

const page = () => {
  return (
    <>
      <header className="w-full flex items-center justify-between lg:p-12 p-6">
        <div>
          <Logo className="w-20 h-11" />
        </div>
        <div>
          {
            process.env.NODE_ENV === "development" &&
            <User size="md" />
          }
        </div>
      </header>
      <div className="relative mt-12 flex flex-col items-center lg:h-[calc(70dvh-144px)] h-[calc(80dvh-144px)] lg:mt-20">
        <HeroSection />

        <div className="absolute -z-10 lg:-bottom-32 -bottom-48 min-w-[1440] w-full px-32 flex items-center justify-between">
          <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-6">
            <div className="w-36 aspect-square rounded-3xl border"></div>
            <div className="w-36 aspect-square rounded-3xl row-start-2 col-start-2 border"></div>
            <div className="w-36 aspect-square rounded-3xl row-start-3 col-start-1 border"></div>
            <div className="w-36 aspect-square rounded-3xl row-start-3 col-start-3 border"></div>
          </div>
          <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-6">
            <div className="w-36 aspect-square rounded-3xl col-start-3 border"></div>
            <div className="w-36 aspect-square rounded-3xl row-start-2 col-start-2 border"></div>
            <div className="w-36 aspect-square rounded-3xl row-start-3 col-start-1 border"></div>
            <div className="w-36 aspect-square rounded-3xl row-start-3 col-start-3 border"></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-sm flex mx-auto p-6 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="size-1.5 rounded-full animate-pulse bg-success-foreground" />
            <span className="text-sm text-secondary">Available for work</span>
          </div>
          <span className="text-sm text-secondary">/</span>
          <div className="flex items-center gap-1">
            <ClockIcon size={12} className="text-secondary" />
            <LiveTime className="text-secondary" />
            <span className="text-sm text-secondary">UTC +5</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="mailto:yz13.vessel@gmail.com" className="text-sm text-secondary inline-flex items-center gap-1.5"><MailIcon size={14} /> Mail me</Link>
        </div>
      </div>
      <section className="relative w-full h-screen bg-background border-t">
        {
          process.env.NODE_ENV === "development"
            ? <ContentSection />
            : <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl font-pixel">New content is coming soon</span>
            </div>
        }
      </section>
    </>
  )
}

export default page
