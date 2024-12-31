import Image from "next/image";
import { cn } from "yz13/cn";
import { Release } from "./releases";

const ReleaseIcon = ({
  icon,
  className = "",
}: {
  className?: string,
  icon: Release["icon"]
}) => {
  return (
    <div className={cn(
      "size-6 shrink-0 rounded-md border bg-yz-neutral-100 p-1",
      className,
    )}>
      <div className="w-full h-full relative">
        {icon && (
          <>
            <Image className="dark-mode-image" src={icon.dark} fill alt="" />
            <Image className="light-mode-image" src={icon.light} fill alt="" />
          </>
        )}
      </div>
    </div>
  );
};

export default ReleaseIcon;
