import { getReleaseProgress, releases } from "@/const/releases";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import { FolderIcon } from "lucide-react";

dayjs.extend(relativeTime);

const ReleasesList = () => {
  return (
    <ul className="space-y-2">
      {releases
        .sort((a, b) => {
          const aProgress = getReleaseProgress(a.id);
          const bProgress = getReleaseProgress(b.id);
          return bProgress - aProgress;
        })
        .map((release, index) => {
          const startedAt = dayjs(release.created_at).locale("ru").fromNow();
          const percent = getReleaseProgress(release.id);
          return (
            <li key={release.id + "-" + index}>
              <div className="h-8 flex items-center gap-2 justify-between">
                <div className="w-1/3">
                  <div className="h-8 py-1 rounded-md flex items-center shrink-0 gap-1.5 bg-yz-neutral-200/60 w-fit px-2">
                    <FolderIcon className="shrink-0 size-4 lg:!size-[18]" />
                    <span className="lg:!text-sm text-xs line-clamp-1">
                      {release.name}
                    </span>
                  </div>
                </div>
                <div className="w-1/3 h-2 rounded-md border bg-yz-neutral-200/30 relative">
                  <div
                    style={{ width: `${percent}%` }}
                    className="h-full rounded-md relative bg-foreground"
                  >
                    <span className="text-xs absolute -top-5 text-secondary -right-4">
                      {percent}%
                    </span>
                  </div>
                </div>
                <span className="w-1/3 text-end lg:!text-sm text-xs shrink-0 text-secondary line-clamp-1">
                  {startedAt}
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ReleasesList;
