import { Release } from "@/const/releases";
import { useDraggable } from "@dnd-kit/core";
import ProjectCard from "./project-card";

const DraggableCard = ({ release }: { release: Release }) => {
  const id = release.id;
  const { setNodeRef } = useDraggable({
    id: id,
  });
  return <ProjectCard release={release} ref={setNodeRef} />;
};

export default DraggableCard;
