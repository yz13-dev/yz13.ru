import { getShortPricing } from "@/actions/pricing/pricing";
import { get } from "@vercel/edge-config";
import { ReactNode } from "react";
import { cn } from "yz13/cn";
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
  const pricing = await getShortPricing();
  const busy = (await get<boolean>("busy")) ?? false;
  const sign = await get<string>("price-sign");
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {side === "left" && children}
      <NavWrapper>
        <Services services={pricing} busy={busy} sign={sign} />
        <Projects />
      </NavWrapper>
      {side === "right" && children}
    </div>
  );
};

export default Nav;
