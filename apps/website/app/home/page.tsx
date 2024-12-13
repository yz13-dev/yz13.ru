import { ClockIcon, MailIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import ContentSection from "./content-section"
import HeroSection, { HeroBackground } from "./hero-section"
const LiveTime = dynamic(() => import("./live-time"), {
  ssr: false
})

const page = () => {
  return (
    <>
      <div className="relative mt-0 flex flex-col items-center lg:h-[calc(70dvh-144px)] h-fit lg:mt-20">
        <HeroSection />
        <HeroBackground />
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
