import { viewsChart } from "@/actions/charts/views";
import { ViewsChartSession } from "@/types/session";
import Views from "./views";

const getTotalViews = (views: ViewsChartSession | null) => {
  if (!views) return 0;
  const total = views.chart.data.reduce((acc, curr) => acc + curr.count, 0);
  return total;
};

const ViewsChart = async () => {
  const views = await viewsChart();

  const totalViews = getTotalViews(views);

  return (
    <div className="w-full aspect-video p-4 flex flex-col gap-1.5">
      <div className="flex items-center gap-2 justify-between">
        <span className="text-base text-foreground">Просмотры</span>
        <span className="text-xs text-secondary">За неделю</span>
        {/* <div className="w-36 h-6 rounded-md bg-neutral-200" /> */}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-medium text-foreground">
          {totalViews}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-secondary">+ 0%</span>
          <span className="text-xs text-secondary capitalize">
            с пред. недели
          </span>
        </div>
      </div>
      <div className="w-full h-full">{views && <Views views={views} />}</div>
    </div>
  );
};

export default ViewsChart;
