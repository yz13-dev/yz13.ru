import { Release } from "@/const/releases";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { Separator } from "mono/components/separator";
import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "yz13/cn";

export interface ProjectProps extends React.HTMLAttributes<HTMLDivElement> {
  release: Release;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectProps>(
  ({ release, className = "", ...props }: ProjectProps, ref) => {
    const icon = release.icon;
    const dateFormated = dayjs(release.created_at)
      .locale("ru")
      .format("MMM DD, YYYY");
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 h-fit rounded-xl flex-col border p-3 hover:border-foreground transition-colors",
          className,
        )}
        {...props}
      >
        <div className="flex h-fit items-center gap-2">
          <div className="size-6 flex items-center justify-center relative border rounded-lg">
            {icon && (
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
            )}
          </div>
          <span className="text-base font-medium">{release.name}</span>
        </div>
        <span className="text-secondary text-sm">{release.description}</span>
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
