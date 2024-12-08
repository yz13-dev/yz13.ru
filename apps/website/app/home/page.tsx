import { Logo } from "@/components/logo"
import User from "@/components/user"
import { ClockIcon, MailIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Skill } from "@/components/skill-label"
import RoadMap from "../road-map"
import { SidebarProvider } from "mono/components/sidebar"
import ContentSection from "./content-section"
import ContentSidebar from "./content-sidebar"
const LiveTime = dynamic(() => import("./live-time"), {
  ssr: false
})

const page = () => {
  return (
    <>
      <header className="w-full flex items-center justify-between lg:p-12 p-6">
        <Logo className="w-20 h-11" />
        <User size="md" />
      </header>
      <div className="max-w-5xl w-full mx-auto divide-y mt-12 h-[calc(80dvh-144px)] lg:mt-20">
        <section className="space-y-12 lg:p-12 p-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold">Hi there, i'm YZ13</h1>
            <p className="text-2xl text-secondary">
              Just fullstack developer, nothing crazy.
            </p>
          </div>
          <div className="w-full space-y-3">
            <div className="w-full flex lg:flex-row flex-col lg:items-center items-start gap-2">
              <span className="text-sm h-6 font-medium flex items-center">Frontend:</span>
              <ul className="inline-flex items-start gap-1 flex-wrap">
                <li><Skill><Skill.Label>React</Skill.Label><Skill.Scale current={4} max={5} /></Skill></li>
                <li><Skill><Skill.Label>Typescript</Skill.Label><Skill.Scale current={3} max={5} /></Skill></li>
                <li><Skill><Skill.Label>NextJS</Skill.Label><Skill.Scale current={4} max={5} /></Skill></li>
                <li><Skill><Skill.Label>Vite</Skill.Label><Skill.Scale current={2} max={5} /></Skill></li>
                <li><Skill><Skill.Label>TailwindCSS</Skill.Label><Skill.Scale current={4} max={5} /></Skill></li>
                <li><Skill><Skill.Label>Zod</Skill.Label><Skill.Scale current={2} max={5} /></Skill></li>
              </ul>
            </div>
            <div className="w-full flex lg:flex-row flex-col lg:items-center items-start gap-2">
              <span className="text-sm h-6 font-medium flex items-center">Backend:</span>
              <ul className="inline-flex items-start gap-1 flex-wrap">
                <li><Skill><Skill.Label>NodeJS</Skill.Label><Skill.Scale current={3} max={5} /></Skill></li>
                <li><Skill><Skill.Label>Typescript</Skill.Label><Skill.Scale current={3} max={5} /></Skill></li>
                <li><Skill><Skill.Label>PostgresQL</Skill.Label><Skill.Scale current={1} max={5} /></Skill></li>
                <li><Skill><Skill.Label>MongoDB</Skill.Label><Skill.Scale current={1} max={5} /></Skill></li>
              </ul>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
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
        </section>
      </div>
      <section className="relative w-full rounded-t-3xl bg-background p-6 border">
        <SidebarProvider>
          <ContentSidebar />
          <ContentSection />
        </SidebarProvider>
      </section>
    </>
  )
}

export default page
