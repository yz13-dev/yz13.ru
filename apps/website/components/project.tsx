import { Button } from "@yz13/ui/button"
import { cn } from "@yz13/ui/cn"
import { ArrowRightIcon } from "@yz13/ui/icons"



type Props = {
  orientation?: "horizontal" | "vertical"
}
export default function Project({
  orientation = "horizontal"
}: Props) {

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      data-orientation={orientation}
      className={cn(
        "container group mx-auto gap-3 grid grid-cols-1",
        "data-[orientation=horizontal]:md:grid-cols-2"
      )}
    >
      {
        isHorizontal
          ?
          <div className="size-full flex flex-col justify-between">
            <div className="w-full">
              <div className="*:block space-y-2">
                <h3 className="text-4xl font-medium text-muted-foreground">
                  Проект
                </h3>
                <p className="text-4xl font-medium text-foreground">
                  Описание проекта
                </p>
              </div>
              <div className="w-full py-6 grid grid-cols-2 gap-4">

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="w-fit flex items-center gap-3">
              <Button variant="outline" size="lg">
                <span>Открыть проект</span>
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
          :
          <div className="size-full flex flex-row justify-between">
            <div className="w-full">
              <div className="*:block space-y-2">
                <h3 className="text-4xl font-medium text-muted-foreground">
                  Проект
                </h3>
                <p className="text-4xl font-medium text-foreground">
                  Описание проекта
                </p>
              </div>
              <div className="w-full py-6 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm uppercase">dependency</span>
                    <span className="text-base font-medium">Nextjs</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="w-fit flex items-end pb-6 gap-3">
              <Button variant="outline" size="lg">
                <span>Открыть проект</span>
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
      }
      <div className="size-full">
        <div className={cn(
          "w-full rounded-4xl bg-secondary border",
          "group-data-[orientation=horizontal]:aspect-4/3",
          "group-data-[orientation=vertical]:aspect-video"
        )} />
      </div>
    </div>
  )
}

export const ProjectContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="py-6 hover:bg-card transition-colors">
      {children}
    </section>
  )
}
