"use client";
import { deleteDraft } from "rest-api/drafts";
import { useUser } from "@/lib/use-auth";
import { Draft } from "rest-api/types/drafts";
import { User } from "@supabase/supabase-js";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  Loader2Icon,
  TagIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "yz13/cn";
import { UserObject } from "rest-api/types/user";

dayjs.extend(relativeTime);

type DraftDockProps = {
  draft: Draft;
  author: UserObject | null;
};

const Author = ({ user }: { user: UserObject }) => {
  const userName = user?.username ?? "Пользователь";
  const email = user?.email ?? "you@yz13.ru";
  return (
    <div className="flex flex-row items-center gap-1 justify-between">
      <div className="flex flex-row items-center gap-2">
        <div className="size-10 rounded-full border" />
        <div className="flex flex-col">
          <span className="font-medium text-foreground/80">{userName}</span>
          <span className="text-xs text-foreground">{email}</span>
        </div>
      </div>
      <Button size="icon" variant="ghost">
        <ArrowRightIcon size={16} />
      </Button>
    </div>
  );
};

const DraftDock = ({ draft, author }: DraftDockProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const published_at = dayjs(draft.published_at).locale("ru").fromNow();
  const [user] = useUser();
  const isUserIsAuthor = user?.id === draft.by;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const removeDraft = async () => {
    setLoading(true);
    try {
      deleteDraft(draft.id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      router.push("/drafts");
    }
  };
  return (
    <motion.footer
      layoutId="draft-dock"
      className="p-4 rounded-2xl border mx-auto max-w-xl flex flex-col gap-4 group"
    >
      {author && <Author user={author} />}
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-medium">{draft.title}</span>
          <span className="text-sm text-foreground">
            {draft.description ? draft.description : "Без описания"}
          </span>
        </div>
        <div className="flex flex-row items-center h-8 gap-2">
          {isUserIsAuthor && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="group-hover:flex hidden"
                onClick={removeDraft}
                disabled={loading}
              >
                {loading ? (
                  <Loader2Icon size={16} className="animate-spin" />
                ) : (
                  <TrashIcon size={16} />
                )}
              </Button>
            </>
          )}
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
                    className="flex flex-row w-fit rounded-full border px-2.5 py-1 items-center gap-1 text-foreground"
                    key={tag}
                  >
                    <TagIcon size={14} />
                    <span className="text-xs">{tag}</span>
                  </span>
                ))}
              </div>
              <span className="text-xs text-foreground shrink-0">
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
