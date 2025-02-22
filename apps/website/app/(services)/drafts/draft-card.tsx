import { getUserById } from "@/actions/user/user";
import { cdn } from "@/lib/cdn";
import { Draft } from "@/types/drafts";
import { ImageIcon, TagIcon } from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const DraftAuthor = async ({ author }: { author: string }) => {
  const user = await getUserById(author);
  const userName = user?.user_metadata?.username ?? "Пользователь";
  return (
    <div className="flex flex-row items-center gap-1">
      <span className="text-xs text-secondary">От</span>
      <Link
        href={`/drafts/by/${author}`}
        className="text-xs text-secondary hover:text-foreground cursor-pointer underline"
      >
        {userName}
      </Link>
    </div>
  );
};

const DraftCard = ({ draft }: { draft: Draft }) => {
  return (
    <div className="space-y-1.5 w-full group">
      <div className="w-full aspect-[4/2.5] transition-colors rounded-xl hover:border-foreground border relative">
        {draft.thumbnail ? (
          <Image
            src={cdn(draft.thumbnail)}
            alt="thumbnail"
            fill
            className="rounded-xl object-cover"
          />
        ) : (
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
            {draft.description && (
              <span className="text-secondary">
                {", "}
                {draft.description.slice(0, 100)}
              </span>
            )}
          </span>
          <Suspense fallback={<Skeleton className="w-24 h-4" />}>
            <DraftAuthor author={draft.by} />
          </Suspense>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2">
          {draft.tags.slice(0, 3).map((tag) => (
            <span
              className="flex flex-row rounded-full border px-2.5 py-1 items-center gap-1 text-secondary"
              key={tag}
            >
              <TagIcon size={14} />
              <span className="text-xs">{tag}</span>
            </span>
          ))}
          {/* <button className="flex flex-row items-center gap-1 text-secondary">
            <HeartIcon size={14} />
            <span className="text-xs">1.2k</span>
          </button>
          <div className="flex flex-row items-center gap-1 text-secondary">
            <UserIcon size={14} />
            <span className="text-xs">1.2k</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DraftCard;
