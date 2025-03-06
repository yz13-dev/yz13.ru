"use client";
import { Logo } from "@/components/logo";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "yz13/cn";
import { useRootStore } from "./root-store";
import SearchInput from "./search-input";

type Props = {
  search?: string;
  count?: number;
};
const SearchSection = ({ count = 0, search }: Props) => {
  const expanded = useRootStore((state) => state.expanded);
  return (
    <div
      className={cn(
        "max-w-xl w-full flex flex-col justify-end mx-auto",
        "p-6 transition-all",
        !expanded ? "md:h-80 h-72" : "h-[114px]",
      )}
    >
      <div className="w-full space-y-6 px-6">
        {!expanded && (
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={{ width: 156, height: 36 }} type="full" />
            </Link>
          </div>
        )}
        <div className="w-full flex flex-col gap-1.5">
          <SearchInput defaultValue={search} />
          <div className="flex items-center justify-between px-2">
            <span className="text-secondary text-xs">
              Всего страниц: {count}
            </span>
            <Link
              target="_blank"
              href="https://yz13.ru"
              className="text-secondary hover:underline text-xs flex items-center gap-1"
            >
              yz13.ru
              <ExternalLinkIcon size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
