"use client";

import { useNetwork } from "ahooks";
import { Loader2, WifiIcon, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

const ConntectionStatus = ({ size = 16 }: { size?: number }) => {
  const networkState = useNetwork();
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return <Loader2 size={size} className="animate-spin" />;
  if (networkState.online) return <WifiIcon size={size} />;
  else return <WifiOff size={size} />;
};

export default ConntectionStatus;
