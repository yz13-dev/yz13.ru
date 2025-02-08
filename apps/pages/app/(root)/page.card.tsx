import { PageConfig } from "@/types/page.type";
import dayjs from "dayjs";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "yz13/cn";

import "dayjs/locale/ru";
dayjs.locale("ru");

const PageCard = ({ page }: { page: PageConfig }) => {
  const createdAt = dayjs(page.created_at).format("dd, DD MMMM YYYY");
  const hasThumbnail = !!page.thumbnail === true;
  return (
    <div className="w-full space-y-2 group" key={page.id}>
      <div className="w-full flex justify-center items-start relative hover:border-foreground transition-colors aspect-video overflow-hidden rounded-2xl border bg-background-back">
        <div
          className={cn(
            "w-[82.5%] group-hover:w-[95%] group-hover:top-2 transition-all rounded-2xl border relative top-6 bg-background",
            "delay-100 ease-in-out duration-1000",
            hasThumbnail
              ? "h-fit"
              : "h-[125%] flex items-center justify-center",
          )}
        >
          {page.thumbnail ? (
            <>
              <Image
                src={page.thumbnail.light}
                className="!static rounded-2xl object-cover light-mode-image"
                fill
                alt={page.name}
              />
              <Image
                src={page.thumbnail.dark}
                className="!static rounded-2xl object-cover dark-mode-image"
                fill
                alt={page.name}
              />
            </>
          ) : (
            <ImageIcon size={24} className="text-secondary" />
          )}
        </div>
        <Link
          href={page.path}
          className="w-full h-full absolute top-0 left-0 rounded-xl"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <span className="text-sm font-medium">{page.name}</span>
        <span className="text-xs capitalize text-secondary">{createdAt}</span>
      </div>
    </div>
  );
};

export default PageCard;
