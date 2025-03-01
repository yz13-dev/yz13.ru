"use client";
import { updateProject } from "@/actions/projects/projects";
import { Release, ReleaseStage } from "@/const/releases";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { startTransition, useState } from "react";
import useProjectsStore from "./projects.store";

type DndContextProps = {
  children?: React.ReactNode;
};
const DndContextWrapper = ({ children }: DndContextProps) => {
  const projects = useProjectsStore((state) => state.projects);
  const setProjects = useProjectsStore((state) => state.setProjects);
  const [target, setTarget] = useState<Release | null>(null);

  const applyChange = (project: Release) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === project.id) {
        return project;
      } else return p;
    });
    setProjects(updatedProjects);
  };
  const revertChange = () => {
    if (target) {
      const updatedProjects = projects.map((p) => {
        if (p.id === target.id) {
          return target;
        } else return p;
      });
      setProjects(updatedProjects);
    }
  };
  const handleUpdateProject = async (project: Release) => {
    try {
      applyChange(project);
      const res = await updateProject(project.id, project);
      console.log(res);
      if (!res) revertChange();
    } catch (error) {
      console.error(error);
      revertChange();
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    const overId = event.over?.id;
    // const activeId = event.active?.id;
    const activeData = event.active?.data?.current as Release | undefined;
    const isSameStage = overId === activeData?.stage;
    // console.log(overId, isSameStage);
    // console.log(activeId, activeData);
    if (!isSameStage && activeData) {
      const updatedProject: Release = {
        ...activeData,
        stage: overId as ReleaseStage,
      };
      setTarget(activeData);
      startTransition(() => {
        handleUpdateProject(updatedProject);
      });
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
        tolerance: 25,
      },
    }),
    useSensor(KeyboardSensor),
  );
  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
};

export default DndContextWrapper;
