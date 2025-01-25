import { viewsChart } from "@/actions/charts/views";
import Views from "./views";

const ViewsChart = async () => {
  const views = await viewsChart();
  return (
    <div className="w-full aspect-video p-4 flex flex-col gap-1.5">
      <div className="flex items-center gap-2 justify-between">
        <span className="text-base text-foreground">Views</span>
        <div className="w-36 h-6 rounded-md bg-yz-neutral-200" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-medium text-foreground">0k</span>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-secondary">+ 0%</span>
          <span className="text-xs text-secondary capitalize">
            vs prev month
          </span>
        </div>
      </div>
      <div className="w-full h-full">{views && <Views views={views} />}</div>
    </div>
  );
};

export default ViewsChart;
