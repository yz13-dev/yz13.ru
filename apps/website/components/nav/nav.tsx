import { get } from "@vercel/edge-config";
import { getV1PricingShort } from "@yz13/api";
import { availableForWork } from "@yz13/flags";
import { cn } from "@yz13/ui/cn";
import type { ReactNode } from "react";
import Blog from "./blog";
import NavWrapper from "./nav-wrapper";
import Projects from "./projects";
import Services from "./services";
const Nav = async ({
  children,
  side = "right",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
  side?: "left" | "right";
}) => {
  const services = await getV1PricingShort();
  const busy = await availableForWork();
  const sign = await get<string>("price-sign");
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {side === "left" && children}
      <NavWrapper>
        <Services services={services ?? []} busy={busy} sign={sign} />
        <Projects />
        <Blog />
      </NavWrapper>
      {side === "right" && children}
    </div>
  );
};

export default Nav;
