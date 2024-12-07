import { Logo } from "@/components/logo"
import User from "@/components/user"
import { ClockIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import dynamic from "next/dynamic"
const LiveTime = dynamic(() => import("./live-time"), {
  ssr: false
})

const page = () => {
  return (
    <>
      <header className="w-full flex items-center justify-between p-12">
        <Logo className="w-20 h-11" />
        <User />
      </header>
      <div className="max-w-5xl w-full mx-auto divide-y mt-24">
        <section className="space-y-12 p-12 border-b">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold">Hi there, i'm YZ13</h1>
            <p className="text-2xl text-secondary">
              Just fullstack developer, nothing crazy.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs h-6 font-medium flex items-center">Frontend:</span>
              <ul className="inline-flex items-start gap-1 wrap">
                <li><span className="text-xs px-2 py-1 rounded-full border">React</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">Typescript</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">NextJS</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">Vite</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">TailwindCSS</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">Zod</span></li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs h-6 font-medium flex items-center">Backend:</span>
              <ul className="inline-flex items-start gap-1 wrap">
                <li><span className="text-xs px-2 py-1 rounded-full border">NodeJS</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">Typescript</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">PostgresQL</span></li>
                <li><span className="text-xs px-2 py-1 rounded-full border">MongoDB</span></li>
              </ul>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="size-1.5 rounded-full animate-pulse bg-yz-success-foreground" />
                <span className="text-sm">Available for work</span>
              </div>
              <span className="text-sm">/</span>
              <div className="flex items-center gap-1">
                <ClockIcon size={12} />
                <LiveTime />
                <span className="text-sm">UTC +5</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
            </div>
          </div>
        </section>
      </div>
      <div className="my-14 max-w-5xl w-full mx-auto px-12 mt-14 flex items-center justify-between">
        <span className="text-xs text-secondary">@YZ13</span>
        <div className="flex items-center rounded-full border">
        </div>
      </div>
    </>
  )
}

export default page
