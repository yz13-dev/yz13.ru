import { Skeleton } from "mono/components/skeleton";
import { RootHeaderSkeleton } from "../(root)/header";
import { abc } from "./empty";

const loading = () => {
  return (
    <>
      <RootHeaderSkeleton />
      <div className="w-full divide-y border-b">
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="lg:!h-20 h-10 border-x p-6 space-y-6" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        {abc.map((letter, index) => {
          return (
            <div key={letter} className="w-full">
              <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="flex flex-col gap-2 p-6 border-x">
                  <span className="text-xl font-medium capitalize">
                    {letter}
                  </span>
                  <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 *:h-20">
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />

                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                    <Skeleton className="w-full rounded-lg bg-background-secondary border" />
                  </div>
                </div>
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default loading;
