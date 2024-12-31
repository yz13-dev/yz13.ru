"use client";
import Modal from "@/components/modal";
import dayjs from "dayjs";
import { Progress } from "mono/components/progress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReleaseIcon from "./release-icon";
import { getRelease, getReleaseProgress } from "./releases";

const ReleaseModal = ({ id }: { id: string }) => {
  const release = getRelease(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  if (!release) return null;
  const progress = getReleaseProgress(id);
  return (
    <Modal
      className="p-3 max-w-xl mx-auto rounded-xl border bg-background w-full"
      onClose={() => {
        newSearchParams.delete("id");
        if (newSearchParams.toString() === "") return router.push(pathname);
        else router.push(newSearchParams.toString());
      }}
    >
      <div className="w-full flex items-start gap-4">
        <ReleaseIcon icon={release.icon} className="size-12 rounded-lg p-2" />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium">{release.name}</h2>
            <p className="text-sm text-secondary">{release.description}</p>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">
                {progress}% progress
              </span>
              <span className="text-sm text-secondary">
                Start: {dayjs(release.created_at).format("MMM D, YYYY")}
              </span>
            </div>
            <Progress className="bg-background-back" value={progress} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReleaseModal;
