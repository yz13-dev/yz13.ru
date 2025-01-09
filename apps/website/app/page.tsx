import { Logo } from "@/components/logo";
import Availability from "./(root)/(public)/discover/availability";

const page = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-start gap-3">
          <div className="size-14 shrink-0 rounded-full bg-yz-neutral-200 flex items-center justify-center">
            <Logo className="size-8" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-foreground text-xl font-medium inline-flex items-start flex-wrap gap-2">
              YZ13,
              <span className="text-secondary">
                frontend developer, nothing crazy.
              </span>
            </span>
            <span className="text-secondary">On my way to fullstack.</span>
          </div>
        </div>
        <div className="w-full px-4">
          <Availability />
        </div>
      </div>
    </div>
  );
};

export default page;
