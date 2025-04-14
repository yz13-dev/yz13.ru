import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";

const FullScreenCalendar = dynamic(() => import("./fullscreen-calendar"), {
  loading: () => <Skeleton className="h-dvh w-full rounded-none" />,
});

export default function page() {
  return (
    <>
      <FullScreenCalendar className="h-dvh" />
    </>
  );
}
