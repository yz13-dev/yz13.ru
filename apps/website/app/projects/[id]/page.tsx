import { getProject } from "rest-api/projects";
import User from "@/components/user";
import { getStage, getType, ReleaseType } from "@/const/releases";
import { auth, authorized } from "@/lib/auth";
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
  const { data: release } = await getProject(id);
  const user = await auth();
  const isAdmin = user?.user_metadata?.role === "admin";
  const showControls = (user && isAdmin) ?? false;
  if (!release) return redirect("/projects");
  if (!isAdmin) return redirect("/projects");
  const icon = release.icon as { light: string; dark: string };
  const Icon = ProjectTypeIcons[release.type as ReleaseType];
  return (
    <div className="w-full lg:p-6 p-3 space-y-4 min-h-dvh bg-background-secondary">
      <header className="w-full flex gap-2 items-center justify-between">
        <div className="flex p-1 w-fit bg-background h-12 rounded-lg border items-center gap-1">
          <Button variant="secondary" size="icon" asChild>
            <Link href={`/projects`}>
              <ArrowLeftIcon size={16} />
            </Link>
          </Button>
          <div className="bg-neutral-200 lg:w-56 w-40 flex items-center justify-between h-full rounded-lg p-2">
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
        <div className="flex items-center gap-2">
          {(await authorized()) && <User />}
        </div>
      </header>
      <div className="flex flex-row gap-3">
        <div>
          <div className="flex flex-row gap-2">
            {release?.stage && (
              <div className="mb-3">
                <span className="text-foreground/80 text-sm px-2 py-1 rounded-full border bg-background">
                  {getStage[release?.stage]}
                </span>
              </div>
            )}
            {release?.type && (
              <div className="mb-3">
                <span className="text-foreground/80 text-sm px-2 py-1 rounded-full border bg-background">
                  {getType[release?.type as ReleaseType]}
                </span>
              </div>
            )}
          </div>
          <Form initial={release} />
        </div>
      </div>
    </div>
  );
};

export default page;
