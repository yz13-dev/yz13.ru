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
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });
  return (
    <div
      ref={setNodeRef}
      className={cn("", isOver && "h-full border-foreground", className)}
    >
      {children}
    </div>
  );
};

export default DroppableWrapper;
