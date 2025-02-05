"use client";
import { Release } from "@/const/releases";
import { useDraggable } from "@dnd-kit/core";
import ProjectCard from "./project-card";

const DraggableCard = ({ release }: { release: Release }) => {
  const id = release.id;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <ProjectCard
      release={release}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    />
  );
};

export default DraggableCard;
