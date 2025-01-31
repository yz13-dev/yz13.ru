import { getDrafts } from "@/actions/drafts/drafts";
import { HeartIcon, ImageIcon, UserIcon } from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";

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
      {drafts.map((draft) => {
        return (
          <div className="space-y-1.5 w-full group" key={draft.id}>
            <div className="w-full aspect-[4/2.5] transition-colors rounded-xl group-hover:border-foreground border relative">
              {draft.thumbnail ? null : (
                <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                  <ImageIcon size={20} className="text-secondary" />
                  <span className="text-xs text-secondary">Нет обложки</span>
                </div>
              )}
              <Link
                href={`/drafts/${draft.id}`}
                className="w-full absolute top-0 left-0 h-full rounded-xl"
              />
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground/80">
                  {draft.title}
                </span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-xs text-secondary">От</span>
                  <span className="text-xs text-secondary underline">
                    {draft.by.slice(0, 6)}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <button className="flex flex-row items-center gap-1 text-secondary">
                  <HeartIcon size={14} />
                  <span className="text-xs">1.2k</span>
                </button>
                <div className="flex flex-row items-center gap-1 text-secondary">
                  <UserIcon size={14} />
                  <span className="text-xs">1.2k</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DraftsGrid;
