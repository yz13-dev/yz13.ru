import { Logo } from "@/components/logo"
import { Button } from "@yz13/mono/components/button"
import { Separator } from "@yz13/mono/components/separator"
import { ContactIcon, LayoutGridIcon, MapIcon, UserCircleIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "yz13/cn"
import Card from "./roadmap/card"
import { list } from "@/const/road-map"
import { IconBase } from "@/components/pixel-stack/icon-base"
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

const page = () => {
  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-foreground hover:underline transition-colors font-bold font-pixel uppercase">{children}</span>
  )
  return (
    <>
      <div className="w-full space-y-4 max-w-xl mx-auto md:!p-6 p-4">
        <div className="w-full flex items-center justify-between">
          <span className="text-sm text-secondary">Fullstack Developer</span>
          <span className="text-sm">Available for work</span>
        </div>
        <div className="p-2 rounded-xl border flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full border" />
            <div className="flex flex-col">
              <span className="text-base text-foreground">YZ13</span>
              <span className="text-xs text-secondary">owner@yz13.dev</span>
            </div>
          </div>
          <div className="w-full grid h-16 grid-cols-4 gap-2">
            <Button
              className="w-full h-full rounded-xl border flex flex-col items-center justify-center hover:bg-yz-neutral-100 hover:border-foreground"
              variant="outline"
              asChild
            >
              <Link href="/profile">
                <UserCircleIcon className="text-secondary" size={16} />
                <span className="text-secondary text-xs">Profile</span>
              </Link>
            </Button>
            <Button
              className="w-full h-full rounded-xl border flex flex-col items-center justify-center hover:bg-yz-neutral-100 hover:border-foreground"
              variant="outline"
              asChild
            >
              <Link href="/contacts">
                <ContactIcon className="text-secondary" size={16} />
                <span className="text-secondary text-xs">Contacts</span>
              </Link>
            </Button>
            <Button
              className="w-full h-full rounded-xl border flex flex-col items-center justify-center hover:bg-yz-neutral-100 hover:border-foreground"
              variant="outline"
              asChild
            >
              <Link href="/roadmap">
                <MapIcon className="text-secondary" size={16} />
                <span className="text-secondary text-xs">Roadmap</span>
              </Link>
            </Button>
            <Button
              className="w-full h-full rounded-xl border flex flex-col items-center justify-center hover:bg-yz-neutral-100 hover:border-foreground"
              variant="outline"
              asChild
            >
              <Link href="/services">
                <LayoutGridIcon className="text-secondary" size={16} />
                <span className="text-secondary text-xs">Services</span>
              </Link>
            </Button>
          </div>
        </div >
        <Separator />
        <div className="w-full gap-4 h-fit grid grid-cols-6 auto-rows-auto">
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <ReactIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <NextIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <TypeScriptIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <TailwindIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <ShadcnIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <ViteIcon size={48} />
          </div>


          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <NodeIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <ZodIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <HonoIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <SupabaseIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <JestIcon size={48} />
          </div>
          <div className={cn(
            "w-full aspect-square border rounded-lg",
            "flex items-center justify-center transition-colors hover:border-foreground"
          )}>
            <MongoDBIcon size={48} />
          </div>
        </div>
        <Logo />
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
