"use client";

import { useSearchParams } from "next/navigation";

type ViewWrapperProps = {
  views: Record<string, React.ReactNode>;
  defaultView?: string;
};

export default function ViewWrapper({
  views,
  defaultView = "month",
}: ViewWrapperProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? defaultView;
  if (!view) return null;
  return views[view];
}
