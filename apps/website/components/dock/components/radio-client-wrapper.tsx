"use client";
import { Skeleton } from "@yz13/ui/components/skeleton";
import dynamic from "next/dynamic";

const RadioPlayer = dynamic(() => import("./radio-player"), {
  loading: () => <Skeleton className="h-[26px] w-[100px] rounded-full" />,
  ssr: false,
});

export default function RadioClient() {
  return <RadioPlayer />;
}
