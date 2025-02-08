"use client";
import { Release } from "@/const/releases";
import { useDraggable } from "@dnd-kit/core";
import ProjectCard from "./project-card";

const DraggableCard = ({ release }: { release: Release }) => {
  const id = release.id;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: release,
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
      className={isDragging ? "opacity-50" : ""}
      {...listeners}
      {...attributes}
    />
  );
};

export default DraggableCard;
