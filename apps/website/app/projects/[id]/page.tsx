import { getProject } from "@/actions/projects/projects";
import { getStage } from "@/const/releases";
import { auth } from "@/lib/auth";
import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectTypeIcons from "../project-type-icons";
import Form from "./form";
import ProjectControls from "./project-controls";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const id = params.id;
  const release = await getProject(id);
  const user = await auth();
  const isAdmin = user?.user_metadata?.role === "admin";
  const showControls = (user && isAdmin) ?? false;
  if (!release) return redirect("/projects");
  if (!isAdmin) return redirect("/projects");
  const icon = release.icon;
  const Icon = ProjectTypeIcons[release.type];
  return (
    <div className="max-w-lg w-full p-6 space-y-4">
      <div className="flex p-1 w-fit bg-background-secondary h-12 rounded-lg border items-center gap-1">
        <Button variant="secondary" size="icon" asChild>
          <Link href={`/projects`}>
            <ArrowLeftIcon size={16} />
          </Link>
        </Button>
        <div className="bg-neutral-200 w-56 flex items-center justify-between h-full rounded-lg p-2 flex items-center">
          <div className="flex w-full items-center gap-1">
            <div className="size-6 flex items-center justify-center relative">
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
                <Icon size={18} />
              )}
            </div>
            <span className="line-clamp-1 font-medium">{release?.name}</span>
          </div>
          {showControls && (
            <div className="flex items-center gap-1">
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="icon">
                <ChevronDownIcon size={16} />
              </Button>
            </div>
          )}
        </div>
        {showControls && (
          <ProjectControls id={release.id} initialRelease={release} />
        )}
      </div>
      <div>
        {release?.stage && (
          <div className="mb-3">
            <span className="text-foreground/80 text-sm px-2 py-1 rounded-full border bg-background-secondary">
              {getStage[release?.stage]}
            </span>
          </div>
        )}
        <Form initial={release} />
      </div>
    </div>
  );
};

export default page;
