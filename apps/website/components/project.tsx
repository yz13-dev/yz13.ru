import type { Project as ProjectType } from "@yz13/registries";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon, GlobeIcon } from "@yz13/ui/icons";
import Image from "next/image";
import Link from "next/link";
import ImagesGrid from "./images-grid";



type Props = {
  orientation?: "horizontal" | "vertical"
  project: ProjectType;
};
export default function Project({
  orientation = "horizontal",
  project
}: Props) {

  return (
    <div
      data-orientation={orientation}
      className={cn(
        "container group mx-auto gap-3 grid grid-cols-1",
        "data-[orientation=horizontal]:md:grid-cols-2"
      )}
    >
      <ProjectContent project={project} orientation={orientation} />
      <div className="size-full">
        <div className={cn(
          "w-full rounded-4xl",
          "group-data-[orientation=horizontal]:aspect-4/3",
          "group-data-[orientation=vertical]:aspect-video"
        )}>
          <ImagesGrid
            paths={project.attachment || []}
            className="size-full rounded-4xl border hover:outline-8 outline-border/40 transition-all"
          />
        </div>
      </div>
    </div>
  )
}

const ProjectContent = ({
  project,
  orientation = "horizontal"
}: {
  project: ProjectType,
  orientation?: "horizontal" | "vertical"
}) => {

  const isHorizontal = orientation === "horizontal";

  const hasContent = !!project.contentId;
  const hasUrl = !!project.url;

  if (isHorizontal) return (

    <div className="size-full flex flex-col justify-between">
      <div className="w-full">
        <div className="*:block space-y-2">
          <h3 className="lg:text-4xl text-2xl font-medium text-muted-foreground">
            {project.name}
          </h3>
          <p className="lg:text-4xl text-2xl font-medium text-foreground">
            {project.description}
          </p>
        </div>
        <div className="w-full py-6 grid grid-cols-2 gap-4">
          {
            project.stack.map(item => {
              return (
                <div key={`${project.id}/${item.id}`} className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary flex items-center justify-center">
                    <Image src={item.icon} width={32} height={32} unoptimized alt={item.name} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase text-muted-foreground">{item.category}</span>
                    <span className="text-base font-medium">{item.name}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="w-fit flex items-center gap-3">
        {
          hasUrl && project.url &&
          <Button variant="outline" size="lg" asChild>
            <Link href={project.url} target="_blank">
              <GlobeIcon />
              <span>Открыть сайт</span>
            </Link>
          </Button>
        }
        {
          hasContent &&
          <Button variant="outline" size="lg" asChild>
            <Link href={`/projects/${project.id}`}>
              <span>Открыть проект</span>
              <ArrowRightIcon />
            </Link>
          </Button>
        }
      </div>
    </div>
  )
  return (
    <div className="size-full flex flex-row justify-between">
      <div className="w-full">
        <div className="*:block space-y-2">
          <h3 className="lg:text-4xl text-2xl font-medium text-muted-foreground">
            {project.name}
          </h3>
          <p className="lg:text-4xl text-2xl font-medium text-foreground">
            {project.description}
          </p>
        </div>
        <div className="w-full py-6 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
          {
            project.stack.map(item => {
              return (
                <div key={`${project.id}/${item.id}`} className="flex items-center gap-3">
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary flex items-center justify-center">
                    <Image src={item.icon} width={32} height={32} unoptimized alt={item.name} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase text-muted-foreground">{item.category}</span>
                    <span className="text-base font-medium">{item.name}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="w-fit flex items-end pb-6 gap-3">
        {
          hasUrl && project.url &&
          <Button variant="outline" size="lg" asChild>
            <Link href={project.url} target="_blank">
              <GlobeIcon />
              <span>Открыть сайт</span>
            </Link>
          </Button>
        }
        {
          hasContent &&
          <Button variant="outline" size="lg" asChild>
            <Link href={`/projects/${project.id}`}>
              <span>Открыть проект</span>
              <ArrowRightIcon />
            </Link>
          </Button>
        }
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
