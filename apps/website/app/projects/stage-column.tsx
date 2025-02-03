import { getStage, ReleaseStage } from "@/const/releases";
import { cn } from "yz13/cn";

type StageColumnProps = {
  stage: ReleaseStage;
  count?: number;
  children?: React.ReactNode;
};
const StageColumn = ({
  children,
  stage = "in_plans",
  count = 0,
}: StageColumnProps) => {
  const stageLabel = getStage[stage];
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
