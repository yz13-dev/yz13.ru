import { isPublished } from "@/utils/blog/projects";
import type { Project as ProjectType } from "@yz13/registries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@yz13/ui/accordion";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon, GlobeIcon } from "@yz13/ui/icons";
import Link from "next/link";
import ImagesGrid from "./images-grid";
import { StackItem } from "./stack-item";

type Props = {
  orientation?: "horizontal" | "vertical";
  project: ProjectType;
  defaultOpen?: boolean;
};
export default function Project({
  orientation = "horizontal",
  project,
  defaultOpen = true,
}: Props) {
  const isEmtpy = (project.attachments || [])?.length === 0;
  const subProjects = project.subProjects || [];

  return (
    <div className={cn("pt-12", subProjects.length > 0 ? "pb-0" : "pb-12")}>
      <div
        data-orientation={orientation}
        className={cn(
          "gap-3 grid px-6 size-full group container mx-auto",
          "data-[orientation=horizontal]:md:grid-cols-2 grid-cols-1",
        )}
      >
        <ProjectContent project={project} orientation={orientation} />
        {!isEmtpy && (
          <div className="size-full">
            <div
              className={cn(
                "w-full rounded-4xl",
                "group-data-[orientation=horizontal]:aspect-4/3",
                "group-data-[orientation=vertical]:aspect-video",
              )}
            >
              <ImagesGrid
                paths={project.attachments || []}
                className="size-full rounded-4xl border hover:outline-8 outline-border/40 transition-all"
              />
            </div>
          </div>
        )}
      </div>
      {!!subProjects.length && (
        <Accordion
          className="pt-8"
          type="multiple"
          defaultValue={defaultOpen ? ["group-projects"] : undefined}
        >
          <AccordionItem value="group-projects">
            <AccordionTrigger className="pt-4 pb-12 container mx-auto px-6 [&>svg]:size-8">
              <span className="text-2xl font-medium">
                Сгруппированные проекты ({subProjects.length})
              </span>
            </AccordionTrigger>
            <AccordionContent className="w-full pb-0 col-span-full border-t divide-y">
              {subProjects.map((pr) => {
                return <SupProject key={pr.id} project={pr} />;
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}

const ProjectContent = ({
  project,
  orientation = "horizontal",
}: {
  project: ProjectType;
  orientation?: "horizontal" | "vertical";
}) => {
  const isHorizontal = orientation === "horizontal";
  const hasContent = !!project.contentId;

  const published = isPublished(project.contentId);

  const hasUrl = !!project.url;

  const type = project.type;

  const link = `/${type}s/${project.contentId}`;

  if (isHorizontal)
    return (
      <div className="size-full flex flex-col justify-between">
        <div className="w-full relative">
          <div className="*:block space-y-2 relative">
            {hasContent && published && (
              <Link href={link} className="absolute inset-0" />
            )}
            <h3 className="lg:text-4xl text-2xl font-medium text-muted-foreground">
              {project.name}
            </h3>
            <p className="lg:text-4xl text-2xl font-medium text-foreground">
              {project.description}
            </p>
          </div>
          <div className="w-full py-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {project.stack.map((item) => {
                return (
                  <StackItem key={`${project.id}/${item.id}`} item={item} />
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-fit flex items-center gap-3">
          {hasUrl && project.url && (
            <Button variant="outline" size="lg" asChild>
              <Link href={project.url} target="_blank">
                <GlobeIcon />
                <span>Открыть сайт</span>
              </Link>
            </Button>
          )}
          {hasContent && published && (
            <Button variant="outline" size="lg" asChild>
              <Link href={link}>
                <span>Открыть проект</span>
                <ArrowRightIcon />
              </Link>
            </Button>
          )}
        </div>
      </div>
    );
  return (
    <div className="size-full flex flex-col justify-between">
      <div className="w-full relative">
        <div className="*:block space-y-2 relative">
          {hasContent && published && (
            <Link href={link} className="absolute inset-0" />
          )}
          <h3 className="lg:text-4xl text-2xl font-medium text-muted-foreground">
            {project.name}
          </h3>
          <p className="lg:text-4xl text-2xl font-medium text-foreground">
            {project.description}
          </p>
        </div>
        <div className="w-full py-8 space-y-6">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {project.stack.map((item) => {
              return <StackItem key={`${project.id}/${item.id}`} item={item} />;
            })}
          </div>
        </div>
      </div>
      <div className="w-full flex items-end justify-end pb-6 gap-3">
        {hasUrl && project.url && (
          <Button variant="outline" size="lg" asChild>
            <Link href={project.url} target="_blank">
              <GlobeIcon />
              <span>Открыть сайт</span>
            </Link>
          </Button>
        )}
        {hasContent && published && (
          <Button variant="outline" size="lg" asChild>
            <Link href={link}>
              <span>Открыть проект</span>
              <ArrowRightIcon />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

const SupProject = ({ project }: { project: ProjectType }) => {
  const isEmtpy = (project.attachments || [])?.length === 0;

  const hasContent = !!project.contentId;

  const published = isPublished(project.id);

  const hasUrl = !!project.url;

  const type = project.type;

  const link = `/${type}s/${project.contentId}`;

  return (
    <div className="hover:bg-foreground/5 transition-colors">
      <div className="container mx-auto py-6 px-6 grid md:grid-cols-2 gap-6">
        <div className="size-full flex flex-col justify-between">
          <div>
            <div className="*:block space-y-0 relative">
              {hasContent && published && (
                <Link href={link} className="absolute inset-0" />
              )}
              <h3 className="text-2xl font-medium text-muted-foreground">
                {project.name}
              </h3>
              <p className="text-2xl font-medium text-foreground">
                {project.description}
              </p>
            </div>
            <div className="w-full py-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {project.stack.map((item) => {
                  return (
                    <StackItem key={`${project.id}/${item.id}`} item={item} />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-fit flex items-center gap-3">
            {hasUrl && project.url && (
              <Button variant="outline" size="lg" asChild>
                <Link href={project.url} target="_blank">
                  <GlobeIcon />
                  <span>Открыть сайт</span>
                </Link>
              </Button>
            )}
            {hasContent && published && (
              <Button variant="outline" size="lg" asChild>
                <Link href={link}>
                  <span>Открыть проект</span>
                  <ArrowRightIcon />
                </Link>
              </Button>
            )}
          </div>
        </div>
        {!isEmtpy && (
          <div className="size-full">
            <div
              className={cn(
                "w-full rounded-4xl aspect-4/3",
                "group-data-[orientation=horizontal]:aspect-4/3",
                "group-data-[orientation=vertical]:aspect-video",
              )}
            >
              <ImagesGrid
                paths={project.attachments || []}
                className="size-full rounded-4xl border hover:outline-8 outline-border/40 transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProjectContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="hover:bg-card transition-colors">{children}</section>
  );
};
