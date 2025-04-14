import { cookies } from "next/headers";
import { SidebarSkeleton } from "../sidebar/sidebar-skeleton";

const loading = async () => {
  const cookieStore = await cookies();
  const sidebar = cookieStore.get("sidebar_state")?.value || "false";
  const sidebarState = sidebar === "true" || false;
  return (
    <div className="w-full h-dvh flex flex-row">
      {sidebarState && <SidebarSkeleton />}
      <div className="w-full h-full bg-background-secondary" />
    </div>
  );
};

export default loading;
