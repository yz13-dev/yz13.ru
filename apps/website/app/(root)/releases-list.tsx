"use client";
import { getReleaseProgress, Release, releases } from "@/const/releases";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import { FolderIcon, FolderOpenIcon, LayoutGridIcon } from "lucide-react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { useState } from "react";
import { cn } from "yz13/cn";
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
          return (
            <ReleaseItem key={release.id + "-" + index} release={release} />
          );
        })}
    </ul>
  );
};

const ReleaseItem = ({ release }: { release: Release }) => {
  const startedAt = dayjs(release.created_at).locale("ru").fromNow();
  const percent = getReleaseProgress(release.id);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <li className="group">
      <div className="w-full">
        <div
          className="h-8 flex cursor-pointer items-center gap-2 justify-between"
          onClick={() => setOpen(!open)}
        >
          <div className="w-1/3">
            <div
              className={cn(
                "h-8 py-1 rounded-lg flex items-center shrink-0 gap-1.5 bg-yz-neutral-200/60 w-fit px-2",
                "text-foreground/60 group-hover:text-foreground transition-colors",
              )}
            >
              {release.type === "app" ? (
                open ? (
                  <FolderOpenIcon className="shrink-0 size-4 lg:!size-[18]" />
                ) : (
                  <FolderIcon className="shrink-0 size-4 lg:!size-[18]" />
                )
              ) : release.type === "widget" ? (
                <LayoutGridIcon className="shrink-0 size-4 lg:!size-[18]" />
              ) : null}
              <span className="lg:!text-sm text-xs line-clamp-1">
                {release.name}
              </span>
            </div>
          </div>
          <div className="w-1/3 h-2 rounded-md border bg-yz-neutral-200/30 relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: easeInOut,
              }}
              className="h-full rounded-md relative bg-foreground"
            >
              <span className="text-xs absolute -top-5 text-secondary -right-4">
                {percent}%
              </span>
            </motion.div>
          </div>
          <span className="w-1/3 text-end lg:!text-sm text-xs shrink-0 text-secondary line-clamp-1">
            {startedAt}
          </span>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                height: 12,
                marginTop: 0,
                marginBottom: 0,
              }}
              animate={{
                opacity: 1,
                height: "fit-content",
                marginTop: 6,
                marginBottom: 12,
              }}
              exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
              transition={{ duration: 0.6, ease: easeInOut }}
              className="w-full flex flex-col gap-3 overflow-hidden px-2"
            >
              <span className="text-foreground/60 lg:!text-sm text-xs">
                {release.description ?? "Без описания"}
              </span>
              <span className="text-secondary text-xs capitalize">
                {dayjs(release.created_at).locale("ru").format("dddd, DD MMMM")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};

export default ReleasesList;
