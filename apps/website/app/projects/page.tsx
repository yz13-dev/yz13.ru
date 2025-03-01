import { getProjects } from "@/actions/projects/projects";
import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import PageDockFiller from "@/components/page-dock-filler";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { auth } from "@/lib/auth";
import "dayjs/locale/ru";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import DndContextWrapper from "./dnd-context";
import NewProjectModal from "./new-project-modal";
import ProjectsList from "./projects-list";

export const metadata: Metadata = {
  title: "Персональные проекты",
  description:
    "Нужен разработчик? Мои проекты, которые я разработал, и которые могу быть полезны для вас.",
};

type PageProps = {
  searchParams: {
    project?: string;
  };
};
const page = async ({ searchParams }: PageProps) => {
  const project = searchParams.project;
  const user = await auth();
  const isAdmin = user?.user_metadata?.role === "admin";
  const showNewProjectModal = (user && isAdmin) ?? false;
  const releases = await getProjects();
  const isActive = showNewProjectModal;
  return (
    <>
      <Header className="sticky top-0">
        <Nav side="left">
          <Link href="/">
            <Logo size={{ width: 110, height: 20 }} type="full" />
          </Link>
        </Nav>
        <div className="flex items-center gap-2">
          {showNewProjectModal && <NewProjectModal />}
          <Suspense fallback={<Skeleton className="size-9" />}>
            {(await showAppsLink()) && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/apps">
                  <LayoutGridIcon size={16} />
                </Link>
              </Button>
            )}
          </Suspense>
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {isDev && <User />}
          </Suspense>
        </div>
      </Header>
      <DndContextWrapper>
        <ProjectsList defaultProjects={releases} isActive={isActive} />
      </DndContextWrapper>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
