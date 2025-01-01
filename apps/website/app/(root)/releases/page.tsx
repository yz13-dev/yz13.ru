import Dock from "@/components/dock";
import dayjs from "dayjs";
import Link from "next/link";
import Header from "../header";
import ReleaseIcon from "./release-icon";
import ReleaseModal from "./release-modal";
import { getGroups, getStage, ReleaseStage } from "./releases";

type PageProps = {
  searchParams: {
    id?: string;
  };
};

const page = ({ searchParams }: PageProps) => {
  const groups = getGroups();
  const groupsKeys = Object.keys(groups);
  const releaseId = searchParams.id;
  return (
    <>
      <Header />
      {releaseId && <ReleaseModal id={releaseId} />}
      <div className="w-full p-3 max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-semibold">Releases</h1>
      </div>
      <div className="w-full p-3 overflow-auto flex items-start gap-3 max-w-screen-2xl mx-auto">
        {groupsKeys.map((groupKey) => {
          const key = groupKey as ReleaseStage;
          const stage = getStage[key];
          if (!groups[key].length) return null;
          return (
            <div className="w-72 space-y-3" key={groupKey}>
              <div className="flex items-center gap-2">
                <span className="text-secondary text-sm">{stage}</span>
                <span className="text-secondary text-xs px-2 py-0.5 rounded-md bg-yz-neutral-200">
                  {groups[key].length}
                </span>
              </div>
              {groups[key].map((release) => {
                return (
                  <div
                    key={release.id + "/" + release.created_at}
                    className="flex gap-2 rounded-xl bg-background p-2 border"
                  >
                    <ReleaseIcon icon={release.icon} />
                    <div className="flex flex-col">
                      <Link
                        href={`?id=${release.id}`}
                        className="text-sm font-medium"
                      >
                        {release.name}
                      </Link>
                      {release.description && (
                        <span className="text-xs text-secondary mt-1">
                          {release.description}
                        </span>
                      )}
                      <span className="text-xs text-secondary mt-2">
                        {dayjs(release.created_at).format("ddd, MMM D YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Dock />
    </>
  );
};

export default page;
