import { Logo } from "@/components/layout/logo"
import { Separator } from "@yz13/mono/components/separator"
import { LockIcon, UserCircleIcon } from "lucide-react"

const page = () => {
  const list = Array.from({ length: 10 }).map((_, i) => i)
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
          <div className="flex items-start gap-1 flex-wrap">
            <span className="inline-flex p-0.5 pr-1.5 border rounded-full items-center gap-1">
              <span className="size-4 rounded-full border" />
              <span className="text-xs text-secondary">Location</span>
            </span>
          </div>
          <div className="w-full grid h-16 grid-cols-4 gap-2">
            <button className="w-full h-full rounded-xl border flex flex-col items-center justify-center">
              <UserCircleIcon className="text-secondary" size={16} />
              <span className="text-secondary text-xs">Profile</span>
            </button>
            <button className="w-full h-full rounded-xl border flex flex-col items-center justify-center">
            </button>
            <button className="w-full h-full rounded-xl border flex flex-col items-center justify-center">
            </button>
            <button className="w-full h-full rounded-xl border flex flex-col items-center justify-center">
            </button>
          </div>
        </div>
        <Logo />
        <p className="text-secondary">
          Hey, i'm a fulstack developer, i love to build things.
          My favorite stack is <Highlight>React</Highlight> and <Highlight>Next.js</Highlight>.
          On the other hand, i'm also a big fan of <Highlight>Tailwind</Highlight> and <Highlight>TypeScript</Highlight>.
          For backend i'm using <Highlight>Node.js</Highlight>, <Highlight>Hono</Highlight>.
          For the last few years i've been working on a lot of projects, and i'm always looking for new challenges.
        </p>
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
                      className="w-full hover:bg-yz-neutral-100 peer rounded-xl border"
                    >
                      <div className="p-2.5 h-fit flex gap-3 flex-col">
                        <div className="flex items-center gap-2">
                          <div className="size-7 border rounded-full" />
                          <div className="flex flex-col">
                            <h3 className="text-base">Project#{item}</h3>
                          </div>
                        </div>
                        <span className="inline-flex hover:underline text-xs hover:text-foreground text-secondary items-center gap-1.5">
                          <LockIcon size={12} className="text-inherit" />
                          https://example.dev
                        </span>
                        <div className="flex w-full items-center justify-between">
                          <span
                            className="text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary"
                          >
                            Plan
                          </span>
                          <Separator className="sm:!w-4 w-6 inline-block" />
                          <span
                            className="text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary"
                          >
                            Dev
                          </span>
                          <Separator className="sm:!w-4 w-6 inline-block" />
                          <span
                            className="text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary"
                          >
                            Approval
                          </span>
                          <Separator className="sm:!w-4 w-6 inline-block" />
                          <span
                            className="text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary"
                          >
                            Prod
                          </span>
                        </div>
                      </div>
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
      </div>
    </>
  )
}
export default page
