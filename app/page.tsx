import { Logo } from "./components/logo";

export default function () {
  return (
    <>
      <header className="w-full flex px-6 pt-4 items-center justify-between">
        <div className="w-1/3 flex justify-start">
          <Logo type="full" />
        </div>
        <div className="w-1/3 flex justify-end">
          <div className="size-10 rounded-full border bg-secondary" />
        </div>
      </header>
      <div className="max-w-4xl mx-auto py-12">
        <div className="shrink-0 rounded-xl w-full h-12 bg-card border" />
      </div>
      <div className="w-full max-w-4xl mx-auto pb-6 *:pt-6">
        <div className="w-full flex gap-4">
          <div className="w-2/3 h-48 rounded-xl bg-secondary"></div>
          <div className="w-1/3 h-48 rounded-xl bg-secondary"></div>
        </div>
        <div className="w-full">
          <div className="w-full flex gap-2">
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
            </div>
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
            </div>
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
            </div>
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
