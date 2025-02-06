import { getProjects } from "@/actions/projects/projects";
import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { auth } from "@/lib/auth";
import "dayjs/locale/ru";
import type { Metadata } from "next";
import Link from "next/link";
import DndContextWrapper from "./dnd-context";
import NewProjectModal from "./new-project-modal";
import ProjectsList from "./projects-list";

export const metadata: Metadata = {
  title: "Персональные проекты",
  description:
    "Нужен разработчик? Мои проекты, которые я разработал, и которые могу быть полезны для вас.",
};

const page = async () => {
  const user = await auth();
  const isAdmin = user?.user_metadata?.role === "admin";
  const releases = await getProjects();
  const showNewProjectModal = (user && isAdmin) ?? false;
  const isActive = showNewProjectModal;
  // console.log(releases);
  return (
    <>
      <header className="w-full h-14 flex items-center justify-between px-6 border-b">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
        {showNewProjectModal && <NewProjectModal />}
      </header>
      <DndContextWrapper>
        <ProjectsList defaultProjects={releases} isActive={isActive} />
      </DndContextWrapper>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
