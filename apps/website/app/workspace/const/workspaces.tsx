import { BriefcaseBusinessIcon, HomeIcon, LucideIcon, UserCircleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import WorkspaceLoader from "../workspaces/workspace.loader";
const ProductivityWorkspace = dynamic(() => import("../workspaces/productivity/productivity.workspace"), {
  loading: () => <WorkspaceLoader />,
  ssr: false
});
const WorksWorkspace = dynamic(() => import("../workspaces/works.workspace"), {
  loading: () => <WorkspaceLoader />,
  ssr: false
});
const DefaultWorkspace = dynamic(() => import("../workspaces/default.workspace"), {
  loading: () => <WorkspaceLoader />,
  ssr: false
});


type Workspace = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon
  color: string;
  component: React.ReactNode;
};

export const defaultWorkspace: Workspace = {
  id: "home",
  name: "Home",
  description: "Default workspace",
  icon: HomeIcon,
  color: "primary",
  component: <DefaultWorkspace />,
};
export const productivityWorkspace: Workspace = {
  id: "productivity",
  name: "Productivity",
  description: "Board of my productivity",
  icon: UserCircleIcon,
  color: "primary",
  component: <ProductivityWorkspace />,
};
export const projectsWorkspace: Workspace = {
  id: "works",
  name: "Works",
  description: "Projects I'm working on",
  icon: BriefcaseBusinessIcon,
  color: "primary",
  component: <WorksWorkspace />,
};

export const workspaces = {
  defaultId: defaultWorkspace.id,
  items: [defaultWorkspace, productivityWorkspace, projectsWorkspace],
};
