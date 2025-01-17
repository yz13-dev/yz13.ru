import Dock from "@/components/dock/dock";
import Hero from "./hero";
import ReleasesList from "./releases-list";
import TechList from "./teck-list";

const page = () => {
  return (
    <>
      <Dock />
      <div className="w-full max-w-lg space-y-12 mx-auto mt-[30dvh] *:px-6">
        <Hero />
        <TechList />
        <ReleasesList />
      </div>
    </>
  );
};

export default page;
