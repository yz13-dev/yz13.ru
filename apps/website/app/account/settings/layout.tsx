import { Separator } from "mono/components/separator";
import Sidebar from "./sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mt-[10%] *:max-w-6xl *:w-full *:mx-auto min-h-[calc(100dvh-64px)]">
        <div className="max-w-screen-xl mx-auto px-3 py-6">
          <h1 className="text-2xl font-semibold">Настройки</h1>
        </div>
        <Separator />
        <div className="flex sm:!flex-row flex-col p-3 gap-6 max-w-screen-xl mx-auto">
          <Sidebar className="md:flex hidden" />
          <div className="w-full flex flex-col gap-6">{children}</div>
        </div>
        {/* <PageDockFiller /> */}
      </div>
      {/* <Dock /> */}
    </>
  );
};

export default layout;
