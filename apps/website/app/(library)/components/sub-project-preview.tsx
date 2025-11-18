import { getProject } from "@/utils/blog/projects";
import type { Project } from "@yz13/registries";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon } from "@yz13/ui/icons";
import Link from "next/link";
import Content from "./content";

export default function SubProjectPreview({ project }: { project: Project }) {
  if (!project.contentId) return null;

  const post = getProject(project.contentId);
  if (!post) return null;

  return (
    <div
      key={project.id}
      className="w-full relative overflow-hidden group h-[500px]"
    >
      <div className="transition-opacity group-hover:opacity-25">
        <Content content={post.body} />
      </div>
      <div
        className={cn(
          "size-full absolute inset-0 flex items-center justify-center gap-2 transition-all",
          "bg-linear-to-t group-hover:backdrop-blur-xs backdrop-blur-none from-background to-transparent",
        )}
      >
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
          Нажмите чтобы перейти
        </span>
        <ArrowRightIcon className="group-hover:size-4 size-0 transition-all" />
      </div>
      {post && (
        <Link
          href={`/works/${project.contentId}`}
          className="absolute inset-0"
        />
      )}
    </div>
  );
}
