import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import Link from "next/link";
import { cn } from "yz13/cn";
import Footer from "./footer";
import Hero from "./hero";
import RootGrid from "./root-grid";

const page = async () => {
  return (
    <>
      <header className="w-full h-16 flex items-center justify-center">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
      </header>
      <main className={cn("w-full max-w-xl space-y-0 mx-auto *:p-6 ")}>
        <Hero />
      </main>
      <div className="w-full max-w-xl mx-auto *:px-6 space-y-3">
        <RootGrid />
      </div>
      <div className="w-full max-w-xl mx-auto *:p-6">
        <Footer />
        <PageDockFiller />
      </div>
      <Dock />
    </>
  );
};

export default page;
