import { getProjects } from "@/actions/projects/projects";
import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { getGroups, getStage, ReleaseStage } from "@/const/releases";
import { auth } from "@/lib/auth";
import "dayjs/locale/ru";
import type { Metadata } from "next";
import Link from "next/link";
import DndContextWrapper from "./dnd-context";
import DraggableCard from "./draggable-card";
import NewProjectModal from "./new-project-modal";
import ProjectCard from "./project-card";
import StageColumn from "./stage-column";

export const metadata: Metadata = {
  title: "Персональные проекты",
  description:
    "Нужен разработчик? Мои проекты, которые я разработал, и которые могу быть полезны для вас.",
};

const page = async () => {
  const user = await auth();
  const isAdmin = user?.user_metadata?.role === "admin";
  const releases = await getProjects();
  const groups = getGroups(releases);
  const groupKeys = Object.keys(groups);
  const showNewProjectModal = (user && isAdmin) ?? false;
  const isActive = showNewProjectModal;
  return (
    <>
      <header className="w-full h-14 flex items-center justify-between px-6 border-b">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
        {showNewProjectModal && <NewProjectModal />}
      </header>
      <DndContextWrapper>
        <div className="w-full flex gap-4 p-6 min-h-[calc(100dvh-3.5rem)] overflow-auto">
          {groupKeys.map((group, index) => {
            const groupData = groups[group as ReleaseStage];
            const groupName = getStage[group as ReleaseStage];
            const count = groupData.length;
            return (
              <StageColumn
                active={isActive}
                key={`${index}/${groupName}`}
                stage={group as ReleaseStage}
                count={count}
              >
                {groupData.map((item, i) => {
                  if (isActive)
                    return (
                      <DraggableCard
                        key={`${index}/${i}/${groupName}`}
                        release={item}
                      />
                    );
                  return (
                    <ProjectCard
                      key={`${index}/${i}/${groupName}`}
                      release={item}
                    />
                  );
                })}
              </StageColumn>
            );
          })}
        </div>
      </DndContextWrapper>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
