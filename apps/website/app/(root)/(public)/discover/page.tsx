import Dock from "@/components/dock/dock";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import AppsLine from "./apps-line";
import Availability from "./availability";
import Screens from "./screens";
import UiElements from "./ui-elements";
const WeekLine = dynamic(() => import("./week-line"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-16" />,
});
type PageProps = {};
const page = ({}: PageProps) => {
  // 48px/208px
  return (
    <>
      <div className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6">
        <div className="w-full space-y-6">
          <Availability />
          <WeekLine />
          <AppsLine />
          <Screens />
          <UiElements />
        </div>
      </div>
      <Dock />
    </>
  );
};

export default page;
