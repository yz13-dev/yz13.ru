"use client";
import { useMapState } from "@/state/provider";
import { cn } from "@yz13/ui/cn";
import type { ReactNode } from "react";

const isDev = process.env.NODE_ENV === "development";

const OffsetCoords = () => {
  const offset = useMapState((state) => state.offset);
  return (
    <span className="px-2 py-0.5 border rounded-full bg-background">
      x:{offset.x.toFixed(2)} y:{offset.y.toFixed(2)}
    </span>
  );
};

const Zoom = () => {
  const zoom = useMapState((state) => state.zoom);
  return (
    <span className="px-2 py-0.5 border rounded-full bg-background">
      {zoom.toFixed(2)}
    </span>
  );
};

const CursorPosition = () => {
  const cursor = useMapState((state) => state.cursor);
  return (
    <span className="px-2 py-0.5 border rounded-full bg-background">
      x:{cursor.x.toFixed(2)} y:{cursor.y.toFixed(2)}
    </span>
  );
};

const InfoDock = ({ children }: { children?: ReactNode }) => {
  if (!isDev) return null;
  return (
    <div className="absolute mx-auto left-0 right-0 bottom-6 w-full h-fit flex flex-row gap-2 justify-center items-center">
      {children}
    </div>
  );
};

const Overlay = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full h-dvh absolute left-0 top-0", className)}>
      {children}
      <InfoDock>
        {false && (
          <>
            <CursorPosition />
            <Zoom />
            <OffsetCoords />
          </>
        )}
      </InfoDock>
    </div>
  );
};

export default Overlay;
