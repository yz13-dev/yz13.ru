"use client";

import { makePageThumbnail } from "@/actions/prepare-page";
import { PageConfig } from "@/types/page.type";
import { Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PrepareList = ({ pages = [] }: { pages?: PageConfig[] }) => {
  const router = useRouter();
  const [pagesState, setPagesState] = useState<PageConfig[]>(pages);
  const [queue, setQueue] = useState<PageConfig[]>(pages);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [checked, setChecked] = useState<number[]>([]);
  const fullQueue = () => {
    const filtered = pages.filter((_, i) => checked.includes(i));
    setQueue(filtered);
    return filtered;
  };
  const handleQueue = async () => {
    const queue = fullQueue();
    setRunning(true);
    for (let i = 0; i < queue.length; i++) {
      const page = queue[i];
      if (!page) continue;
      setQueueIndex(i);
      const config = await makePageThumbnail(page.id);
      if (config) {
        const updatedState = pagesState.map((p, i) => {
          if (i === queueIndex) return config;
          return p;
        });
        setPagesState(updatedState);
        const updatedQueue = queue.map((p, i) => {
          if (i === queueIndex) return config;
          return p;
        });
        setQueue(updatedQueue);
      }
    }
    setRunning(false);
    setQueueIndex(0);
    setChecked([]);
    setQueue(pagesState);
    router.refresh();
  };
  const isChecked = (index: number) => checked.includes(index);
  const handleChecked = (index: number) => {
    if (isChecked(index)) {
      setChecked(checked.filter((i) => i !== index));
    } else setChecked([...checked, index]);
  };
  const isAllChecked = () => checked.length === pages.length;
  const handleCheckAll = () => {
    if (checked.length === pages.length) setChecked([]);
    else setChecked(pages.map((_, i) => i));
  };
  return (
    <>
      <div className="w-full h-fit border-b divide-y">
        <div className="container border-x mx-auto w-full h-full p-6 flex items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <Checkbox
              checked={isAllChecked()}
              onCheckedChange={handleCheckAll}
              className="size-5 rounded-md"
            />
            <span className="text-xl font-medium text-secondary">
              {checked.length}/{pages.length} Выбрано
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              onClick={handleQueue}
              variant={checked.length === 0 ? "secondary" : "default"}
              disabled={running || checked.length === 0}
              className="gap-2"
            >
              {running && <Loader2Icon size={16} className="animate-spin" />}
              {running
                ? "Подготавливаем..."
                : `Подготовить ${checked.length} элемента(-ов)`}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-fit border-b divide-y">
        {queue.map((page, i) => {
          return (
            <PrepareCard
              key={`${page.id}-${i}`}
              page={page}
              index={i}
              running={running}
              checked={isChecked(i)}
              onCheckedChange={handleChecked}
            />
          );
        })}
      </div>
    </>
  );
};

type PrepareCardProps = {
  page: PageConfig;
  checked: boolean;
  onCheckedChange: (index: number) => void;
  index: number;
  running?: boolean;
};
const PrepareCard = ({
  running = false,
  page,
  checked,
  index,
  onCheckedChange,
}: PrepareCardProps) => {
  return (
    <section className="hover:bg-background-back transition-colors">
      <div className="container mx-auto border-x w-full p-6 flex lg:!flex-row flex-col gap-4">
        <div className="lg:!w-1/2 w-full flex flex-row gap-0">
          <div className="size-10 flex items-center">
            {running ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              <Checkbox
                disabled={running}
                checked={checked}
                onCheckedChange={() => onCheckedChange(index)}
                className="size-5 rounded-md"
              />
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-4xl font-medium text-secondary">{page.name}</h3>
            <p className="text-4xl font-medium text-foreground">
              {page.description}
            </p>
          </div>
        </div>
        <div className="lg:!w-1/2 w-full flex flex-col gap-2">
          <div className="w-full aspect-[4/3] relative border rounded-3xl overflow-hidden">
            {page.thumbnail && (
              <>
                <Image
                  src={page.thumbnail.light}
                  className="object-cover w-full top-0 left-0"
                  fill
                  alt={page.name}
                />
                <Image
                  src={page.thumbnail.dark}
                  className="object-cover w-full !top-1/2 !left-0"
                  fill
                  alt={page.name}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrepareList;
