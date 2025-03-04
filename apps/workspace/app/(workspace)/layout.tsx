import { TooltipProvider } from "mono/components/tooltip";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <div className="w-full">
        <Header className="border-b" />
        <div className="w-full h-fit flex flex-row">
          <Sidebar />
          <main className="w-full 2xl:max-w-[calc(100dvw-256px)] 2xl:ml-0 max-w-[calc(100dvw-48px)] h-fit p-4 space-y-12">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default layout;
