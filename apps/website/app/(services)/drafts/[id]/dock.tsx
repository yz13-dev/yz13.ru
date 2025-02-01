"use client";
import { Draft } from "@/types/drafts";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronDownIcon, HeartIcon, UserIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "yz13/cn";

dayjs.extend(relativeTime);

const DraftDock = ({ draft }: { draft: Draft }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const published_at = dayjs(draft.published_at).locale("ru").fromNow();
  return (
    <motion.footer
      layoutId="draft-dock"
      initial={{
        bottom: "1.5rem",
        width: "24rem",
      }}
      whileHover={{
        bottom: "2rem",
        width: "26rem",
      }}
      className="p-4 rounded-2xl border mx-auto fixed left-0 right-0 bottom-6 flex flex-col gap-2 group"
    >
      <div className="w-full flex items-center justify-between">
        <span className="text-lg font-medium">{draft.title}</span>
        <div className="flex flex-row items-center h-8 gap-2">
          <Button
            onClick={() => setExpanded(!expanded)}
            size="icon"
            variant="ghost"
            className="group-hover:flex size-8 p-2 hidden"
          >
            <ChevronDownIcon
              size={14}
              className={cn(
                "transition-transform",
                expanded ? "rotate-180" : "rotate-0",
              )}
            />
          </Button>
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
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: "auto",
            }}
            exit={{
              height: 0,
            }}
            className="flex flex-col overflow-hidden gap-2"
          >
            <span className="text-sm text-secondary">
              {draft.description ? draft.description : "Без описания"}
            </span>
            <span className="text-xs text-secondary">{published_at}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default DraftDock;
