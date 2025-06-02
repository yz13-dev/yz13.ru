import { get } from "@vercel/edge-config";
import { availableForWork } from "@yz13/flags";
import type { ReactNode } from "react";
import { getShortPricing } from "rest-api/pricing";
import { cn } from "yz13/cn";
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
  const { data: services } = await getShortPricing();
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
