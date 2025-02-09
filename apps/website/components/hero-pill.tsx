import { Badge } from "mono/components/badge";
import { ReactElement } from "react";

const HeroPillIcon = ({ children }: { children?: React.ReactNode }) => {
  return <div className="">{children}</div>;
};

const HeroPillText = ({ children }: { children?: React.ReactNode }) => {
  return <span className="text-secondary">{children}</span>;
};

type HeroPillChildren = ReactElement<typeof HeroPillIcon | typeof HeroPillText>;
type HeroPillProps = {
  children?: HeroPillChildren | HeroPillChildren[];
};

const HeroPill = ({ children }: HeroPillProps) => {
  return (
    <Badge variant="secondary" className="gap-2">
      {children}
    </Badge>
  );
};

export { HeroPill, HeroPillIcon, HeroPillText };
