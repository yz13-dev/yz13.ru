import { Logo } from "@/components/logo";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import Link from "next/link";
import { Suspense } from "react";
import StoreHeader, { StoreHeaderSkeleton } from "./header";

export default function page() {
  return (
    <>
      <Suspense fallback={<StoreHeaderSkeleton />}>
        <StoreHeader />
      </Suspense>
      <div className="w-full space-y-6 *:max-w-7xl *:mx-auto yz-future-container md:py-[2.5%] py-[5%]">
        <div className="space-y-4">
          <span className="text-lg font-medium block">New</span>
          <ul className="gap-2 grid grid-cols-3 auto-rows-fr *:transition-colors *:p-2">
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-background-secondary">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-background-secondary">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-background-secondary">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-background-secondary">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-background-secondary">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-background-secondary">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <span className="text-lg font-medium block">Popular</span>
          <ul className="gap-4 flex items-center *:transition-colors *:p-2">
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-4">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <span className="text-lg font-medium block">Popular</span>
          <ul className="gap-4 flex items-center *:transition-colors *:p-2">
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-4">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-background-secondary flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-secondary">App escription</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
