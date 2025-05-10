import { useEffect, useState } from "react";

export const useTz = () => {
  const [tz, setTz] = useState<string | null>(null);
  useEffect(() => {
    const newTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (newTz !== tz) setTz(newTz);
  }, [Intl.DateTimeFormat().resolvedOptions().timeZone]);
  return tz;
};
