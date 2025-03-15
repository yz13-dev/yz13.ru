import { Skeleton } from "mono/components/skeleton";
import { cn } from "yz13/cn";

const loading = () => {
  const bubbles = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <>
      <header className="w-full h-14 flex items-center justify-between px-6"></header>
      <div
        id="chat-history-wrapper"
        className="w-full h-[calc(87.5dvh-56px)] overflow-y-auto"
      >
        <div className="mx-auto w-full max-w-xl">
          {bubbles.map((i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <div
                key={`bubble/${i}`}
                className={cn(
                  "w-full gap-1 px-6",
                  side === "left"
                    ? "flex flex-col items-start"
                    : "flex flex-col items-end",
                )}
              >
                <Skeleton className="max-w-md h-8 text-sm px-3 py-1.5 rounded-3xl w-1/2 flex" />
                <Skeleton className="w-12 h-5" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default loading;
