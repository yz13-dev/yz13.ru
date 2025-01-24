const UserAnalytics = () => {
  return (
    <div className="w-full divide-y">
      <div className="w-full grid grid-cols-2 divide-x h-fit">
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground">New Users</span>
            <div className="size-6 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0k</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                vs prev month
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground">Unique Users</span>
            <div className="size-6 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0k</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                vs prev month
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 divide-x h-fit">
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground">Week retention</span>
            <div className="size-6 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0k</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                vs prev month
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-full p-4 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 justify-between">
            <span className="text-sm text-foreground">Session</span>
            <div className="size-6 rounded-full bg-yz-neutral-200" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium text-foreground">0k</span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-secondary">+ 0%</span>
              <span className="text-xs text-secondary capitalize">
                vs prev month
              </span>
            </div>
          </div>
        </div>
      </div>
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
        <div className="w-full h-full rounded-xl bg-yz-neutral-200" />
      </div>
    </div>
  );
};

export default UserAnalytics;
