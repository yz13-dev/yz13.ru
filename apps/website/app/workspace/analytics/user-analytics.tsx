import ViewsChart from "./views-chart";

const UserAnalytics = async () => {
  return (
    <div className="w-full divide-y">
      <div className="w-full grid grid-cols-2 divide-x h-fit">
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground">Новых пользователей</span>
            <div className="size-6 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0 тыс.</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                с пред. недели
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground line-clamp-1">
              Уникальных пользователей
            </span>
            <div className="size-6 shrink-0 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0 тыс.</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                с пред. недели
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 divide-x h-fit">
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground">Недельное удержание</span>
            <div className="size-6 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0 тыс.</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                с пред. недели
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground">Сессии</span>
            <div className="size-6 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0 тыс.</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                с пред. недели
              </span>
            </div>
          </div>
        </div>
      </div>
      <ViewsChart />
    </div>
  );
};

export default UserAnalytics;
