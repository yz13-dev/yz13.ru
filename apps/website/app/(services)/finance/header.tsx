import { Logo } from "@/components/logo";
import User from "@/components/user";
import { ChevronDown, ChevronLeft, MapIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="absolute top-6 left-6 w-fit border z-10 flex items-center gap-2 py-1 pl-1 pr-2 rounded-xl bg-background">
      <Button size="icon" variant="ghost" asChild className="size-6">
        <Link href="/discover">
          <ChevronLeft size={16} />
        </Link>
      </Button>
      <Logo className="size-6" />
      <span className="text-secondary">/</span>
      <div className="size-6 relative flex items-center justify-center">
        <Image
          className="dark-mode-image"
          src="/apps/yz-finance-dark.svg"
          width={18}
          height={18}
          alt="yz-finance"
        />
        <Image
          className="light-mode-image"
          src="/apps/yz-finance-light.svg"
          width={18}
          height={18}
          alt="yz-finance"
        />
      </div>
      <span className="font-pixel text-sm">Finance</span>
    </div>
  );
};

const Status = () => {
  return (
    <div className="absolute top-6 left-0 right-0 mx-auto w-fit z-10 flex items-center gap-2">
      <div className="w-fit border flex items-center gap-2 py-1 px-2 rounded-xl bg-background">
        0.0$
      </div>
      <div className="w-fit border flex items-center gap-2 py-1 px-2 rounded-xl bg-background">
        <MapIcon size={16} />
        <span className="text-sm">Map</span>
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

const Info = () => {
  return (
    <div className="absolute top-6 right-6 w-fit z-10 flex items-center gap-2">
      <User />
    </div>
  );
};

export { Nav, Status, Info };
