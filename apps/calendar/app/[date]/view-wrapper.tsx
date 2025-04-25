"use client";

import { useSearchParams } from "next/navigation";

type ViewWrapperProps = {
  views: Record<string, React.ReactNode>;
};

export default function ViewWrapper({ views }: ViewWrapperProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  if (!view) return null;
  return views[view];
}
