import { Logo } from "@/components/logo"
import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon"
import { NextIcon } from "@/components/pixel-stack/next-icon"
import { NodeIcon } from "@/components/pixel-stack/node-icon"
import { ReactIcon } from "@/components/pixel-stack/react-icon"
import { SupabaseIcon } from "@/components/pixel-stack/supabase-icon"
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon"
import { ViteIcon } from "@/components/pixel-stack/vite-icon"
import { ZodIcon } from "@/components/pixel-stack/zod"
import { ArrowRight } from "lucide-react"
import { Separator } from "mono/components/separator"
import Footer from "./footer"
import Header from "./header"

const page = () => {
  return (
    <main className="w-full space-y-12 py-6">
      <Header />
      <div className="page-width-limit space-y-12">
        <div className="size-24 rounded-full mx-auto flex items-center justify-center border">
          <Logo className="size-12" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-pixel text-center font-bold">YZ13</h1>
          <p className="text-base text-center text-secondary">Hey, I'm YZ13, a frontend developer.</p>
        </div>
        <Separator />
        <div className="w-full flex flex-row gap-6">
          <ul className="max-w-56 w-full h-fit rounded-xl border hover:bg-yz-neutral-100 space-y-2 p-2 hover:border-foreground">
            <li className="w-full group">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-lg border group-hover:border-foreground"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Website</span>
                  <span className="text-xs text-secondary">A website for YZ13</span>
                </div>
              </div>
            </li>
            <li className="w-full group">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-lg border group-hover:border-foreground"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Workspace</span>
                  <span className="text-xs text-secondary">A workspace for YZ13</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="w-full grid grid-cols-4 gap-6 p-2">
            <ReactIcon size={48} />
            <NextIcon size={48} />
            <TypeScriptIcon size={48} />
            <ViteIcon size={48} />
            <Separator className="col-span-full" />
            <NodeIcon size={48} />
            <SupabaseIcon size={48} />
            <ZodIcon size={48} />
            <MongoDBIcon size={48} />
          </div>
        </div>
        <div className="w-full flex items-center justify-center h-56 border border-dashed rounded-xl">
          <span className="text-sm text-secondary text-center">Roadmap</span>
        </div>
        <button className="w-full h-16 rounded-full hover:border-foreground border flex items-center justify-between px-6">
          <span className="text-2xl font-bold">Let's work</span>
          <ArrowRight size={36} className="size-9 rounded-full bg-foreground text-background p-1" />
        </button>
      </div>
      <Footer />
    </main>
  )
}
export default page
