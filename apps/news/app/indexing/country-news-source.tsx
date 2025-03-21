import { getNewsSources } from "@/actions/sources/sources";
import { ArrowUpRightIcon } from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import News, { NewsSkeleton } from "./news";

export const CountryNewsSourceSkeleton = () => {
  return (
    <div className="w-full grid xl:grid-cols-2 grid-col-2 gap-1.5">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <ArrowUpRightIcon size={20} />
          </Link>
        </div>
        <NewsSkeleton />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <ArrowUpRightIcon size={20} />
          </Link>
        </div>
        <NewsSkeleton />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <ArrowUpRightIcon size={20} />
          </Link>
        </div>
        <NewsSkeleton />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <ArrowUpRightIcon size={20} />
          </Link>
        </div>
        <NewsSkeleton />
      </div>
    </div>
  );
};

const CountryNewsSource = async ({ code }: { code: string }) => {
  const sources = await getNewsSources(code);
  return (
    <div className="w-full grid xl:grid-cols-2 grid-col-2 gap-1.5">
      {sources.map((source) => {
        return (
          <div className="w-full flex flex-col gap-4" key={source.id}>
            <div className="flex items-center gap-3">
              <Link
                href={source.url}
                className="text-2xl font-semibold inline-flex items-center gap-2"
              >
                <span>{source.name}</span>
                <ArrowUpRightIcon size={20} />
              </Link>
            </div>
            {source.rss && (
              <div className="flex items-center gap-2">
                <Link href={source.rss}>source.rss</Link>
              </div>
            )}
            <Suspense fallback={<NewsSkeleton />}>
              <News sourceId={source.id} />
            </Suspense>
          </div>
        );
      })}
    </div>
  );
};
export default CountryNewsSource;
