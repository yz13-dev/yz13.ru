"use client";
import { useEffect, useState } from "react";

/**
 * Хук для определения временной зоны пользователя.
 * @returns {string} IANA timezone (например, "Europe/Moscow").
 */
export const useTz = (): string => {
  const [tz, setTz] = useState<string>("UTC");
  useEffect(() => {
    const newTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (newTz !== tz) setTz(newTz);
  }, [Intl.DateTimeFormat().resolvedOptions().timeZone]);
  return tz;
};
