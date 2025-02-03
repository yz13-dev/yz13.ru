import { getStage, ReleaseStage } from "@/const/releases";
import { cn } from "yz13/cn";
import DroppableWrapper from "./droppable-wrapper";

type StageColumnProps = {
  active?: boolean;
  stage: ReleaseStage;
  count?: number;
  children?: React.ReactNode;
};
const StageColumn = ({
  active = false,
  children,
  stage = "in_plans",
  count = 0,
}: StageColumnProps) => {
  const stageLabel = getStage[stage];
  if (active) {
    return (
      <DroppableWrapper
        stage={stage}
        className="w-80 h-fit rounded-xl shrink-0 border p-2 space-y-2"
      >
        <div className="w-full px-2">
          <span className="text-sm">
            {stageLabel} ({count})
          </span>
        </div>
        <div className={cn("flex flex-col gap-2")}>{children}</div>
      </DroppableWrapper>
    );
  }
  return (
    <div className="w-80 h-fit rounded-xl shrink-0 border p-2 space-y-2">
      <div className="w-full px-2">
        <span className="text-sm">
          {stageLabel} ({count})
        </span>
      </div>
      <div className={cn("flex flex-col gap-2")}>{children}</div>
    </div>
  );
};

export default StageColumn;
