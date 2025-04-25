"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mono/components/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const views = [
  {
    value: "day",
    label: "День",
  },
  {
    value: "week",
    label: "Неделя",
  },
  {
    value: "month",
    label: "Месяц",
  },
  {
    value: "year",
    label: "Год",
  },
];

export default function ViewSelector({
  defaultView = "month",
  className = "",
}: {
  className?: string;
  defaultView: string;
}) {
  const [view, setView] = useState<string>(defaultView);
  const router = useRouter();
  const searchParams = useSearchParams();
  const changeView = (value: string) => {
    setView(value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("view", value);
    const pathname = `?${newSearchParams.toString()}`;
    router.push(pathname);
  };
  return (
    <Select value={view} onValueChange={changeView}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Вид календаря" />
      </SelectTrigger>
      <SelectContent>
        {views.map((view) => {
          return (
            <SelectItem value={view.value} key={view.value}>
              {view.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
