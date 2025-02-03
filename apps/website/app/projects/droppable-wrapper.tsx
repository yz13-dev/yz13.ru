"use client";
import { ReleaseStage } from "@/const/releases";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "yz13/cn";

const DroppableWrapper = ({
  className = "",
  children,
  stage,
}: {
  className?: string;
  children?: React.ReactNode;
  stage: ReleaseStage;
}) => {
  const { setNodeRef } = useDroppable({
    id: stage,
  });
  return (
    <div ref={setNodeRef} className={cn("", className)}>
      {children}
    </div>
  );
};

export default DroppableWrapper;
