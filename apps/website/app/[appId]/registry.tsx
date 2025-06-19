import { ReactNode, Suspense } from "react";
import Ogs, { SectionSkeleton as OgsSectionSkeleton } from "./widgets/ogs";
import Sites, { SectionSkeleton as SitesSectionSkeleton } from "./widgets/sites";


export const registry = new Map<string, () => ReactNode>();

registry.set("ogs", () => (
  <Suspense fallback={<OgsSectionSkeleton />}>
    <Ogs />
  </Suspense>
));
registry.set("sites", () => (
  <Suspense fallback={<SitesSectionSkeleton />}>
    <Sites />
  </Suspense>
));

export const getWiget = (tagId: string) => registry.get(tagId);
