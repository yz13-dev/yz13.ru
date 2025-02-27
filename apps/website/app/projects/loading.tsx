import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import PageDockFiller from "@/components/page-dock-filler";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import StageColumn from "./stage-column";

const loading = () => {
  return (
    <>
      <Header className="sticky top-0">
        <Nav side="left">
          <Link href="/">
            <Logo size={{ width: 110, height: 20 }} type="full" />
          </Link>
        </Nav>
        <div className="flex items-center gap-2">
          <Skeleton className="size-9" />
          <Skeleton className="h-9 w-[75px]" />
        </div>
      </Header>
      <div className="w-full flex gap-4 p-6 min-h-[calc(100dvh-3.5rem)] overflow-auto">
        <StageColumn stage="in_plans" count={0}>
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
        </StageColumn>
        <StageColumn stage="in_progress" count={0}>
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
        </StageColumn>
        <StageColumn stage="in_testing" count={0}>
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
        </StageColumn>
        <StageColumn stage="in_review" count={0}>
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
        </StageColumn>
        <StageColumn stage="released" count={0}>
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
          <Skeleton className="W-full aspect-video rounded-xl" />
        </StageColumn>
      </div>
      <PageDockFiller />
    </>
  );
};

export default loading;
