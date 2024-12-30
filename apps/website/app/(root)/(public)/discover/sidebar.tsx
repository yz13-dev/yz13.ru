import {
  BadgePlusIcon,
  SmartphoneIcon,
  TerminalSquareIcon,
  ToggleLeftIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import Link from "next/link";
import { ReactNode } from "react";

const Span = ({ children }: { children: ReactNode }) => (
  <span className="lg:!inline hidden">{children}</span>
);

const Sidebar = () => {
  return (
    <aside className="lg:w-52 w-fit flex shrink-0 flex-col gap-2">
      <Button variant="ghost" className="w-full gap-2 justify-start" asChild>
        <Link href="/terminal">
          <TerminalSquareIcon size={16} />
          <Span>Terminal</Span>
        </Link>
      </Button>
      <Separator />
      <Button variant="secondary" className="w-full gap-2 justify-start">
        <BadgePlusIcon size={16} />
        <Span>New</Span>
      </Button>
      <Button variant="ghost" className="w-full gap-2 justify-start">
        <SmartphoneIcon size={16} />
        <Span>Screens</Span>
      </Button>
      <Button variant="ghost" className="w-full gap-2 justify-start">
        <ToggleLeftIcon size={16} />
        <Span>UI Elements</Span>
      </Button>
    </aside>
  );
};

export default Sidebar;
