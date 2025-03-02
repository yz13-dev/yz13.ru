import { getType, Release } from "@/const/releases";
import dayjs from "dayjs";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import { Separator } from "mono/components/separator";
import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "yz13/cn";

import "dayjs/locale/ru";
import { Button } from "mono/components/button";
import Link from "next/link";
import ProjectTypeIcons from "./project-type-icons";

export interface ProjectProps extends React.HTMLAttributes<HTMLDivElement> {
  release: Release;
  isActive?: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectProps>(
  (
    { release, className = "", isActive = false, ...props }: ProjectProps,
    ref,
  ) => {
    const icon = release.icon;
    const dateFormated = dayjs(release.created_at)
      .locale("ru")
      .format("MMM DD, YYYY");
    const Icon = ProjectTypeIcons[release.type];
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 h-fit rounded-xl flex-col border p-3 hover:border-foreground transition-colors",
          "bg-background group",
          className,
        )}
        {...props}
      >
        <div className="flex h-fit items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-9 flex items-center justify-center relative border rounded-lg",
                "group-hover:border-foreground transition-colors bg-background-back",
              )}
            >
              {icon ? (
                <>
                  <Image
                    src={icon.light}
                    className="light-mode-image"
                    width={18}
                    height={18}
                    alt={release.name}
                  />
                  <Image
                    src={icon.dark}
                    className="dark-mode-image"
                    width={18}
                    height={18}
                    alt={release.name}
                  />
                </>
              ) : (
                <Icon
                  size={18}
                  className="text-secondary group-hover:text-foreground transition-colors"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium">{release.name}</span>
              <span className="text-xs text-secondary">
                {getType[release.type]}
              </span>
            </div>
          </div>
          {isActive && (
            <Button
              size="icon"
              variant="ghost"
              asChild
              className="group-hover:opacity-100 opacity-0"
            >
              <Link href={`/projects/${release.id}`}>
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
          )}
        </div>
        {release.description && (
          <span className="text-secondary text-sm line-clamp-2">
            {release.description}
          </span>
        )}
        <Separator className="mt-2" />
        <div className="flex gap-2 items-center text-secondary">
          <CalendarIcon size={16} />
          <span className="text-xs capitalize">{dateFormated}</span>
        </div>
      </div>
    );
  },
);

export default ProjectCard;
