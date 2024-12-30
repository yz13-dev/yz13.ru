import AppsLine from "./apps-line";
import Screens from "./screens";
import Sidebar from "./sidebar";
import UiElements from "./ui-elements";

type PageProps = {};
const page = ({}: PageProps) => {
  return (
    <div className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6">
      <div className="w-full flex items-start gap-6">
        <Sidebar />
        <div className="w-full space-y-3">
          <AppsLine />
          <Screens />
          <UiElements />
        </div>
      </div>
    </div>
  );
};

export default page;
