import { ReactNode, Suspense } from "react";
import Ogs, { SectionSkeleton as OgsSectionSkeleton } from "./widgets/ogs";
import Sites, { SectionSkeleton as SitesSectionSkeleton } from "./widgets/sites";

export type CommonProps = {
  className?: string;
  max?: number;
}

export const registry = new Map<string, (props: CommonProps) => ReactNode>();

registry.set("ogs", (props) => (
  <Suspense fallback={<OgsSectionSkeleton />}>
    <Ogs {...props} />
  </Suspense>
));
registry.set("sites", (props) => (
  <Suspense fallback={<SitesSectionSkeleton />}>
    <Sites {...props} />
  </Suspense>
));

export const getWiget = (tagId: string) => registry.get(tagId);
