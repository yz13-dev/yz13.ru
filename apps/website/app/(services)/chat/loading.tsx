import { SidebarSkeleton } from "./sidebar/sidebar-skeleton";

const loading = () => {
  return (
    <div className="w-full h-dvh flex flex-row">
      <SidebarSkeleton />
      <div className="w-full h-full"></div>
    </div>
  );
};

export default loading;
