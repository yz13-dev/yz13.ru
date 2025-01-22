import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import Footer from "./footer";
import Hero from "./hero";
import ReleasesList from "./releases-list";
import TechList from "./tech-list";

const page = async () => {
  return (
    <>
      <Dock />
      <div className="w-full max-w-lg space-y-12 mx-auto mt-[15dvh] *:px-6">
        <Hero />
        <TechList />
        <ReleasesList />
        <Footer />
        <PageDockFiller />
      </div>
    </>
  );
};

export default page;
