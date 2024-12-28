import {
    ArrowRightIcon,
    BriefcaseBusinessIcon,
    EllipsisIcon,
    GlobeIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import RoleSelection from "./role-selection";
import SocialsBlock from "./socials-block";
const LiveDate = dynamic(() => import("@/app/workspace/live-date"), {
  ssr: false,
  loading: () => (
    <span className="text-base font-medium text-secondary">
      August, 13 2001
    </span>
  ),
});
const page = () => {
  return (
    <div className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6">
      <section className="w-full flex flex-col-reverse gap-3">
        <div className="w-fit space-y-3">
          <p className="text-sm text-secondary">
            Just frontend developer, nothing crazy.
          </p>
          <SocialsBlock />
        </div>
      </section>
      <section className="w-full space-y-3">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-sm inline-flex items-center gap-2">
            <BriefcaseBusinessIcon size={16} /> Works
          </h3>
          <Button
            className="rounded-full size-6 p-0"
            size="icon"
            variant="ghost"
          >
            <ArrowRightIcon size={14} />
          </Button>
        </div>
        <div className="grid w-full gap-3 lg:!grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <RoleSelection className="w-full" />
{
  process.env.NODE_ENV === "development" &&
          <div className="w-full relative rounded-xl p-1 space-y-1 border">
            <div className="w-full rounded-lg bg-yz-neutral-100 relative hover:bg-yz-neutral-200 border border-transparent hover:border-yz-neutral-300 aspect-[16/10]">
              <Image
                className="object-cover rounded-[inherit]"
                src="/layers/finance-16-10.png"
                fill
                alt="finance-app-image"
              />
            </div>
            <div className="flex flex-col gap-2 p-1">
              <Link
                href="/library/finance"
                className="w-full flex items-center gap-2"
              >
                <GlobeIcon size={16} />
                <span className="text-sm">Finance app</span>
              </Link>
              <div className="w-full flex items-center justify-between pl-6 gap-2">
                <span className="text-xs text-secondary">
                  Updated years ago
                </span>
                <EllipsisIcon size={16} />
              </div>
            </div>
          </div>
}
          {/*
            <div className="w-full rounded-xl p-1 space-y-1 border">
            <div className="w-full rounded-xl bg-yz-neutral-100 hover:bg-yz-neutral-200 border border-transparent hover:border-yz-neutral-300 aspect-[16/10]"></div>
            <div className="flex flex-col gap-2 p-1">
              <div className="w-full flex items-center gap-2">
                <GlobeIcon size={16} />
                <span className="text-sm">Website</span>
              </div>
              <div className="w-full flex items-center justify-between pl-6 gap-2">
                <span className="text-xs text-secondary">Updated years ago</span>
                <EllipsisIcon size={16} />
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default page;
