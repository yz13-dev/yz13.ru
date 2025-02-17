import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import PageDockFiller from "@/components/page-dock-filler";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import StageColumn from "./stage-column";

const loading = () => {
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          <Skeleton className="size-9" />
        </Nav>
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
