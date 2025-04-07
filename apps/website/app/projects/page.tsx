import Dock, { DockSkeleton } from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import { showUser } from "@/const/flags";
import { auth } from "@/lib/auth";
import "dayjs/locale/ru";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjects } from "rest-api/projects";
import RootHeader, { RootHeaderSkeleton } from "../(root)/header";
import DndContextWrapper from "./dnd-context";
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
  const { data: releases } = await getProjects();
  const isActive = showNewProjectModal;
  return (
    <>
      <Suspense fallback={<RootHeaderSkeleton />}>
        <RootHeader />
      </Suspense>
      <div className="w-full bg-background-secondary">
        <DndContextWrapper>
          <ProjectsList defaultProjects={releases ?? []} isActive={isActive} />
        </DndContextWrapper>
        <PageDockFiller />
      </div>
      <Suspense fallback={<DockSkeleton />}>
        <Dock showUser={await showUser()} />
      </Suspense>
    </>
  );
};

export default page;
