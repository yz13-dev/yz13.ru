import { getDrafts } from "@/actions/drafts/drafts";
import { Skeleton } from "mono/components/skeleton";
import DraftCard from "./draft-card";

export const DraftsGridSkeleton = () => {
  const count = 10;
  const skeletons = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className="grid xl:!grid-cols-5 lg:!grid-cols-4 md:!grid-cols-3 sm:!grid-cols-2 gap-4">
      {skeletons.map((skeleton) => {
        return (
          <div
            className="space-y-1.5 w-full group"
            key={`skeleton/${skeleton}`}
          >
            <Skeleton className="w-full aspect-[4/2.5] transition-colors rounded-xl group-hover:border-foreground border relative" />
            <Skeleton className="w-full h-9 rounded-lg" />
          </div>
        );
      })}
    </div>
  );
};

const DraftsGrid = async () => {
  const drafts = await getDrafts();
  return (
    <div className="grid xl:!grid-cols-5 lg:!grid-cols-4 md:!grid-cols-3 sm:!grid-cols-2 gap-4">
      {drafts.map((draft) =>
        <DraftCard draft={draft} key={draft.id} />
      )}
    </div>
  );
};

export default DraftsGrid;
