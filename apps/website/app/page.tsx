import { Logo } from "@/components/logo"
import { Button } from "@yz13/mono/components/button"
import { Separator } from "@yz13/mono/components/separator"
import { ContactIcon, LayoutGridIcon, MapIcon, UserCircleIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "yz13/cn"
import Card from "./roadmap/card"
import { list } from "@/const/road-map"
import { ReactIcon } from "@/components/pixel-stack/react-icon"
import { NextIcon } from "@/components/pixel-stack/next-icon"
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon"
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon"
import { ShadcnIcon } from "@/components/pixel-stack/shadcn-ui-icon"
import { ViteIcon } from "@/components/pixel-stack/vite-icon"
import { NodeIcon } from "@/components/pixel-stack/node-icon"
import { ZodIcon } from "@/components/pixel-stack/zod"
import { HonoIcon } from "@/components/pixel-stack/hono-icon"
import { SupabaseIcon } from "@/components/pixel-stack/supabase-icon"
import { JestIcon } from "@/components/pixel-stack/jest-icon"
import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon"
import { Checkbox } from "@yz13/mono/components/checkbox"
import { Calendar } from "@yz13/mono/components/calendar"

const page = () => {
  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-foreground hover:underline transition-colors font-bold font-pixel uppercase">{children}</span>
  )
  return (
    <>
      <div className="w-full space-y-8 max-w-xl mx-auto md:!p-6 p-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-sm text-foreground">YZ13</h1>
            <span className="text-sm text-secondary">Fullstack Developer</span>
          </div>
          <span className="text-sm">Available for work</span>
        </div>
        <span className="text-xs text-secondary">Today, 5 November 2025</span>
        <div className="w-full h-fit flex gap-2">
          <div className="w-full space-y-1.5">
            <ul>
              <li>
                <div className="p-2 rounded-xl flex items-start gap-2 border hover:bg-yz-neutral-100 hover:border-foreground">
                  <div className="size-8 rounded-md border"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">Event 1</span>
                    <span className="text-xs text-secondary">Mon, 11 Nov 2024</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="h-full shrink-0 rounded-xl border">
            <Calendar />
          </div>
        </div>
        <Separator />
        <ul className="space-y-1.5">
          <li>
            <div className="w-full border hover:bg-yz-neutral-100 hover:border-foreground flex items-center justify-between rounded-xl p-2 ">
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox-task-1" />
                <label className="text-sm" htmlFor="checkbox-task-1">Complete some stuff</label>
              </div>
            </div>
          </li>
          <li>
            <div className="w-full border hover:bg-yz-neutral-100 hover:border-foreground flex items-center justify-between rounded-xl p-2 ">
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox-task-2" />
                <label className="text-sm" htmlFor="checkbox-task-2">Start to todo stuff</label>
              </div>
            </div>
          </li>
        </ul>
        <Separator />
        <div className="w-full">
          <ul className="*:transition-colors grid sm:!grid-cols-2 grid-cols-1 auto-rows-auto gap-2">
            {
              list
                .filter((_, i) => i <= 4)
                .map(item => {
                  return (
                    <li
                      key={`pr-${item}`}
                      className={cn(
                        "w-full peer rounded-xl border transition-colors",
                        "hover:border-foreground hover:bg-yz-neutral-100"
                      )}
                    >
                      <Card item={item} />
                    </li>
                  )
                })
            }
          </ul>
        </div>
        <Separator />
        <footer className="w-full h-fit flex justify-center mx-auto">
          <div className="w-fit h-fit flex items-center gap-2 bg-background">
            <div className="size-10 rounded-xl relative opacity-20 p-1">
              <div className="w-full h-full relative">
                <Logo className="w-full h-full" />
              </div>
            </div>
          </div>
        </footer>
      </div >
    </>
  )
}
export default page
