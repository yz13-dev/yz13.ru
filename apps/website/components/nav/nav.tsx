import { availableForWork, showBlog } from "@/const/flags";
import { get } from "@vercel/edge-config";
import { ReactNode } from "react";
import { cn } from "yz13/cn";
import Blog from "./blog";
import NavWrapper from "./nav-wrapper";
import Projects from "./projects";
import Services from "./services";
import { getShortPricing } from "rest-api/pricing";
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
        {(await showBlog()) && <Blog />}
      </NavWrapper>
      {side === "right" && children}
    </div>
  );
};

export default Nav;
