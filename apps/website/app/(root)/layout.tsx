import { Logo } from "@/components/logo";
import User from "@/components/user";
import Nav from "./nav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="w-full max-w-4xl mx-auto mt-24 h-16 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-9" />
          <span className="font-pixel text-2xl">YZ13</span>
        </div>
        <div className="flex items-center gap-2">
          <Nav />
          <User disabled />
        </div>
      </header>
      {children}
    </>
  );
};

export default layout;
