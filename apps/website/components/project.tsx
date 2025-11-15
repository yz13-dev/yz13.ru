import { isPublished } from "@/utils/blog/projects";
import type { Project as ProjectType } from "@yz13/registries";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon, GlobeIcon } from "@yz13/ui/icons";
import Link from "next/link";
import ImagesGrid from "./images-grid";
import { StackItem } from "./stack-item";



type Props = {
  orientation?: "horizontal" | "vertical"
  project: ProjectType;
};
export default function Project({
  orientation = "horizontal",
  project
}: Props) {

  const isEmtpy = (project.attachment || [])?.length === 0;

  return (
    <div
      data-orientation={orientation}
      className={cn(
        "container group mx-auto gap-3 grid",
        "data-[orientation=horizontal]:md:grid-cols-2 grid-cols-1"
      )}
    >
      <ProjectContent project={project} orientation={orientation} />
      {
        !isEmtpy &&
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
      }
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

  const published = isPublished(project.id);

  const hasUrl = !!project.url;

  const type = project.type;

  const link = `/${type}s/${project.id}`;

  if (isHorizontal) return (

    <div className="size-full flex flex-col justify-between">
      <div className="w-full relative">
        {
          hasContent && published &&
          <Link href={link} className="absolute inset-0" />
        }
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
                <StackItem key={`${project.id}/${item.id}`} item={item} />
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
          hasContent && published &&
          <Button variant="outline" size="lg" asChild>
            <Link href={link}>
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
      <div className="w-full relative">
        {
          hasContent && published &&
          <Link href={link} className="absolute inset-0" />
        }
        <div className="*:block space-y-2">
          <h3 className="lg:text-4xl text-2xl font-medium text-muted-foreground">
            {project.name}
          </h3>
          <p className="lg:text-4xl text-2xl font-medium text-foreground">
            {project.description}
          </p>
        </div>
        <div className="w-full py-6 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {
            project.stack.map(item => {
              return (
                <StackItem key={`${project.id}/${item.id}`} item={item} />
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
          hasContent && published &&
          <Button variant="outline" size="lg" asChild>
            <Link href={link}>
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
    <section className="py-12 hover:bg-card transition-colors">
      {children}
    </section>
  )
}
