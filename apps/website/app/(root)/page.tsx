import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import { showProcess, showReleasesList } from "@/const/flags";
import Footer from "./footer";
import Hero from "./hero";
import Process from "./process";
import ReleasesList from "./releases-list";

const page = async () => {
  return (
    <>
      <div className="w-full max-w-4xl space-y-6 mx-auto sm:!mt-[15dvh] mt-6 *:px-6">
        <Hero />
        {(await showProcess()) && <Process />}
        {(await showReleasesList()) && <ReleasesList />}
        <Footer />
        <PageDockFiller />
      </div>
      <Dock />
    </>
  );
};

export default page;
