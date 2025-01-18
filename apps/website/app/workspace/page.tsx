import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-dvh flex flex-row">
      <aside className="w-80 h-dvh border-r"></aside>
      <div className="w-[calc(100dvw-20rem)] h-dvh divide-y">
        <div className="w-full h-14 px-6 flex items-center justify-between">
          <Link href="/">
            <Logo className="size-9" />
          </Link>
        </div>
        <div className="w-full h-[calc(100%-3.5rem-83px)]" />
        <div className="w-full p-3 flex items-center justify-center">
          <Dock className="static w-full justify-between" />
        </div>
      </div>
    </div>
  );
};

export default page;
