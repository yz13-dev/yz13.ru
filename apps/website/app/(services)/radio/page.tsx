import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import dynamic from "next/dynamic";
const RadiosPlaylist = dynamic(() => import("./radios-playlist"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <div className="w-full max-w-lg space-y-6 mx-auto mt-[15dvh] *:px-6">
        <div className="space-y-2">
          <h1 className="text-xl font-medium text-foreground">Радио</h1>
          <p className="text-sm text-secondary">
            Пока вы зависаете на сайте, рекомендую послушать радио из списка
            ниже.
          </p>
        </div>
        <RadiosPlaylist />
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
