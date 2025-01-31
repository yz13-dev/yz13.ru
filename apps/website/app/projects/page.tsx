import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { getGroups, getStage, ReleaseStage } from "@/const/releases";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { CalendarIcon } from "lucide-react";
import { Separator } from "mono/components/separator";
import Image from "next/image";
import Link from "next/link";
import { cn } from "yz13/cn";

const page = () => {
  const groups = getGroups();
  const groupKeys = Object.keys(groups);
  return (
    <>
      <header className="w-full h-14 flex items-center px-6 border-b">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
      </header>
      <div className="w-full flex gap-4 p-6 min-h-[calc(100dvh-3.5rem)] overflow-auto">
        {groupKeys.map((group, index) => {
          const groupData = groups[group as ReleaseStage];
          const groupName = getStage[group as ReleaseStage];
          return (
            <div
              key={`${index}/${groupName}`}
              className="w-80 h-fit rounded-xl shrink-0 border p-2 space-y-2"
            >
              <div className="w-full px-2">
                <span className="text-sm">{groupName}</span>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-2",
                  groupData.length === 0 && "hidden",
                )}
              >
                {groupData.map((item, i) => {
                  const icon = item.icon;
                  const dateFormated = dayjs(item.created_at)
                    .locale("ru")
                    .format("MMM DD, YYYY");
                  return (
                    <div
                      key={`${index}/${i}/${groupName}`}
                      className="flex gap-2 h-fit rounded-xl flex-col border p-3"
                    >
                      <div className="flex h-fit items-center gap-2">
                        <div className="size-6 flex items-center justify-center relative border rounded-lg">
                          {icon && (
                            <>
                              <Image
                                src={icon.light}
                                className="light-mode-image"
                                width={18}
                                height={18}
                                alt={item.name}
                              />
                              <Image
                                src={icon.dark}
                                className="dark-mode-image"
                                width={18}
                                height={18}
                                alt={item.name}
                              />
                            </>
                          )}
                        </div>
                        <span className="text-base font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-secondary text-sm">
                        {item.description}
                      </span>
                      <Separator className="mt-2" />
                      <div className="flex gap-2 items-center text-secondary">
                        <CalendarIcon size={16} />
                        <span className="text-xs capitalize">
                          {dateFormated}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
