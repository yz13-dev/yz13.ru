"use client";
import { Draft } from "@/types/drafts";
import { User } from "@supabase/supabase-js";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowRightIcon, ChevronDownIcon, TagIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "yz13/cn";

dayjs.extend(relativeTime);

type DraftDockProps = {
  draft: Draft;
  user: User | null;
};

const Author = ({ user }: { user: User }) => {
  const userName = user?.user_metadata?.username ?? "Пользователь";
  const email = user?.user_metadata?.email ?? "you@yz13.ru";
  return (
    <div className="flex flex-row items-center gap-1 justify-between">
      <div className="flex flex-row items-center gap-2">
        <div className="size-10 rounded-full border" />
        <div className="flex flex-col">
          <span className="font-medium text-foreground/80">{userName}</span>
          <span className="text-xs text-secondary">{email}</span>
        </div>
      </div>
      <Button size="icon" variant="ghost">
        <ArrowRightIcon size={16} />
      </Button>
    </div>
  );
};

const DraftDock = ({ draft, user }: DraftDockProps) => {
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
      className="p-4 rounded-2xl border mx-auto fixed left-0 right-0 bottom-6 flex flex-col gap-4 group"
    >
      {user && <Author user={user} />}
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-medium">{draft.title}</span>
          <span className="text-sm text-secondary">
            {draft.description ? draft.description : "Без описания"}
          </span>
        </div>
        <div className="flex flex-row items-center h-8 gap-2">
          <Button
            onClick={() => setExpanded(!expanded)}
            size="icon"
            variant="ghost"
            className="group-hover:flex hidden"
          >
            <ChevronDownIcon
              size={16}
              className={cn(
                "transition-transform",
                expanded ? "rotate-180" : "rotate-0",
              )}
            />
          </Button>
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
            className="flex flex-col overflow-hidden gap-3"
          >
            <Separator />
            <div className="flex flex-row items-center gap-1 justify-between">
              <div className="flex flex-row items-start flex-wrap gap-1">
                {draft.tags.map((tag) => (
                  <span
                    className="flex flex-row w-fit rounded-full border px-2.5 py-1 items-center gap-1 text-secondary"
                    key={tag}
                  >
                    <TagIcon size={14} />
                    <span className="text-xs">{tag}</span>
                  </span>
                ))}
              </div>
              <span className="text-xs text-secondary shrink-0">
                {published_at}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default DraftDock;
