import { Logo } from "@/components/layout/logo"
import { Separator } from "@yz13/mono/components/separator"


const page = () => {
  const list = Array.from({ length: 10 }).map((_, i) => i)
  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-secondary hover:text-foreground transition-colors font-bold font-pixel uppercase">{children}</span>
  )
  return (
    <div className="w-full space-y-4 max-w-xl mx-auto p-6">
      <Logo />
      <p className="text-foreground/70">
        Hey, i'm a fulstack developer, i love to build things.
        My favorite stack is <Highlight>React</Highlight> and <Highlight>Next.js</Highlight>.
        On the other hand, i'm also a big fan of <Highlight>Tailwind</Highlight> and <Highlight>TypeScript</Highlight>.
        For backend i'm using <Highlight>Node.js</Highlight>, <Highlight>Hono</Highlight>.
        For the last few years i've been working on a lot of projects, and i'm always looking for new challenges.
      </p>
      <Separator />
      <div className="w-full">
        <ul className="*:transition-colors grid grid-cols-2 auto-rows-auto gap-2">
          {
            list
              .filter((_, i) => i <= 4)
              .map(item => {
                return (
                  <li
                    key={`pr-${item}`}
                    className="w-full hover:bg-yz-neutral-100 peer rounded-xl border"
                  >
                    <div className="p-2.5 h-fit flex flex-col">
                      <div className="flex items-center gap-2">
                        <div className="size-10 border rounded-xl" />
                        <div className="flex flex-col">
                          <h3 className="text-base font-medium">Project#{item}</h3>
                          <span className="text-xs text-secondary">Project type</span>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })
          }
        </ul>
      </div>
    </div>
  )
}
export default page
