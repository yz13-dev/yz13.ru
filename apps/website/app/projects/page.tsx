import { getProjects } from "@/actions/projects/projects";
import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import PageDockFiller from "@/components/page-dock-filler";
import { PagesLogo } from "@/components/pages-logo";
import User from "@/components/user";
import { showPagesPromo } from "@/const/flags";
import { auth } from "@/lib/auth";
import "dayjs/locale/ru";
import type { Metadata } from "next";
import Link from "next/link";
import { isDev } from "../login/get-url";
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
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          {(await showPagesPromo()) && (
            <div className="size-9 flex justify-center group relative items-center transition-colors">
              <PagesLogo
                size={{ width: 16, height: 16 }}
                type="only-icon"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <Link
                href="https://pages.yz13.ru"
                className="w-full h-full absolute inset-0"
              />
            </div>
          )}
          {showNewProjectModal && <NewProjectModal />}
          {isDev && <User />}
        </Nav>
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
