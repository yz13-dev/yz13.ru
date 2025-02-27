import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import Header from "./neader/header";
import Sidebar from "./sidebar/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Header className="border-b" />
      <div className="w-full h-fit flex flex-row">
        <Sidebar />
        <main className="w-full 2xl:max-w-[calc(100dvw-256px)] 2xl:ml-0 max-w-[calc(100dvw-48px)] h-fit p-4 space-y-12">
          {children}
          <PageDockFiller />
        </main>
        <Dock />
      </div>
    </div>
  );
};

export default layout;
