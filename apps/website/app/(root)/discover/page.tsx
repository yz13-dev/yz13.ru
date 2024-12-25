import { BadgePlusIcon, SmartphoneIcon, ToggleLeftIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { ReactNode } from "react"
import { cn } from "yz13/cn"

type PageProps = {

}
const page = ({ }: PageProps) => {
  const Span = ({ children }: { children: ReactNode }) => <span className="lg:!inline hidden">{children}</span>
  return (
    <div
      className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6"
    >
      <div className="w-full flex items-start gap-6">
        <aside className="lg:w-52 w-fit flex shrink-0 flex-col gap-2">
          {/* <Button variant="ghost" className="w-full gap-2 justify-start" asChild>
            <Link href="/terminal">
              <TerminalSquareIcon size={16} />
              <Span>Terminal</Span>
            </Link>
          </Button>
          <Separator /> */}
          <Button variant="secondary" className="w-full gap-2 justify-start">
            <BadgePlusIcon size={16} />
            <Span>New</Span>
          </Button>
          <Button variant="ghost" className="w-full gap-2 justify-start">
            <SmartphoneIcon size={16} />
            <Span>Screens</Span>
          </Button>
          <Button variant="ghost" className="w-full gap-2 justify-start">
            <ToggleLeftIcon size={16} />
            <Span>UI Elements</Span>
          </Button>
        </aside>
        <div className="w-full space-y-3">
          <section className={cn(
            "w-full grid grid-cols-7 gap-3",
            "*:w-full *:aspect-square *:rounded-xl *:border *:border-dashed"
          )}>
            <div className="w-full h-16 col-span-full flex items-center justify-center">
              <span className="text-sm text-secondary">Realeses</span>
            </div>
          </section>
          <section className="w-full space-y-3">
            <span className="text-sm text-secondary">Screens</span>
            <div className="w-full grid grid-cols-4 gap-3">
              <div className="w-full h-36 col-span-full flex items-center justify-center rounded-xl border border-dashed">
                <span className="text-sm text-secondary">Different</span>
              </div>
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full h-full col-span-2 rounded-xl bg-yz-neutral-100"></div> */}
            </div>
            <div className="w-full grid grid-cols-4 gap-3">
              <div className="w-full h-36 col-span-full flex items-center justify-center rounded-xl border border-dashed">
                <span className="text-sm text-secondary">Screens</span>
              </div>
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
            </div>
          </section>
          {/* <section className="w-full space-y-3">
            <span className="text-sm text-secondary">UI Elements</span>
            <ul
              className={cn(
                "w-full h-fit flex items-start flex-wrap gap-1",
                "*:bg-yz-neutral-200 *:text-foreground/80 *:px-3 *:py-1 *:rounded-full *:text-sm"
              )}
            >
              <li className="hover:text-foreground transition-colors cursor-pointer">Button</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Input</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Card</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Badge</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Avatar</li>
            </ul>
          </section> */}
        </div>
      </div>
    </div>
  )
}

export default page