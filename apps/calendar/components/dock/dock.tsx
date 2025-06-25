import { Suspense } from "react";
import User, { UserSkeleton } from "../user";
import Nav from "./nav";
import Wrapper from "./wrapper";


export default function ({ className = "" }: { className?: string }) {
  return (
    <>
      <div className="h-[var(--dock-height)] w-full"></div>
      <Wrapper className={className}>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <Nav />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Suspense fallback={<UserSkeleton />}>
              <User />
            </Suspense>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
