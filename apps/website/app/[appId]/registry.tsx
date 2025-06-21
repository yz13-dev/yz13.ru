import { ReactNode, Suspense } from "react";
import Ogs, { SectionSkeleton as OgsSectionSkeleton } from "./widgets/ogs";
import Sites, { SectionSkeleton as SitesSectionSkeleton } from "./widgets/sites";

export type CommonProps = {
  className?: string;
  max?: number;
}

export const registry = new Map<string, (props: CommonProps) => ReactNode>();

registry.set("ogs", (props) => (
  <Suspense fallback={<OgsSectionSkeleton className={props.className} />}>
    <Ogs {...props} />
  </Suspense>
));
registry.set("sites", (props) => (
  <Suspense fallback={<SitesSectionSkeleton className={props.className} />}>
    <Sites {...props} />
  </Suspense>
));

export const getWiget = (tagId: string) => registry.get(tagId);
