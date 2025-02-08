import { PageConfig } from "@/types/page.type";
import dayjs from "dayjs";
import Link from "next/link";

const PageCard = ({ page }: { page: PageConfig }) => {
  const createdAt = dayjs(page.created_at).format("DD MMMM YYYY");
  return (
    <div className="w-full space-y-2 group" key={page.id}>
      <div className="w-full relative group-hover:border-foreground transition-colors aspect-video overflow-hidden rounded-xl border px-4 pt-4 bg-background-back">
        <div className="w-full h-[125%] rounded-xl border relative bg-background"></div>
        <Link
          href={page.path}
          className="w-full h-full absolute top-0 left-0 rounded-xl"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <span className="text-sm font-medium">{page.name}</span>
        <span className="text-xs text-secondary">{createdAt}</span>
      </div>
    </div>
  );
};

export default PageCard;
