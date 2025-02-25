import { getProject } from "@/actions/projects/projects";
import dayjs from "dayjs";
import { CalendarIcon, EditIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { DialogClose } from "mono/components/dialog";
import { Separator } from "mono/components/separator";
import Image from "next/image";
import { redirect } from "next/navigation";
import { cn } from "yz13/cn";
import ProjectTypeIcons from "../project-type-icons";
import ModalWrapper from "./wrapper";

const ProjectModal = async ({ projectId }: { projectId: string }) => {
  const release = await getProject(projectId);
  if (!release) return redirect("/projects");
  const icon = release.icon;
  const Icon = ProjectTypeIcons[release.type];
  const dateFormated = dayjs(release.created_at)
    .locale("ru")
    .format("MMM DD, YYYY");
  return (
    <ModalWrapper>
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
          <span className="text-base font-medium">{release.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <EditIcon size={16} />
          </Button>
          <DialogClose className="size-9 flex items-center justify-center">
            <XIcon size={16} />
          </DialogClose>
        </div>
      </div>
      {release.description && (
        <span className="text-secondary text-sm">{release.description}</span>
      )}
      <Separator className="mt-2" />
      <div className="flex gap-2 items-center text-secondary">
        <CalendarIcon size={16} />
        <span className="text-xs capitalize">{dateFormated}</span>
      </div>
    </ModalWrapper>
  );
};

export default ProjectModal;
