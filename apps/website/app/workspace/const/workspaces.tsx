import dynamic from "next/dynamic";
import WorkspaceLoader from "../workspaces/workspace.loader";
const BlogWorkspace = dynamic(() => import("../workspaces/blog.workspace"), {
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
  icon: string;
  color: string;
  component: React.ReactNode;
};

const defaultWorkspace: Workspace = {
  id: "default",
  name: "Default",
  description: "Default workspace",
  icon: "news",
  color: "primary",
  component: <DefaultWorkspace />,
};
const newsWorkspace: Workspace = {
  id: "blog",
  name: "Blog",
  description: "Latest news from the team",
  icon: "news",
  color: "primary",
  component: <BlogWorkspace />,
};
const projectsWorkspace: Workspace = {
  id: "works",
  name: "works",
  description: "Projects I'm working on",
  icon: "news",
  color: "primary",
  component: <WorksWorkspace />,
};

export const workspaces = {
  defaultId: defaultWorkspace.id,
  items: [defaultWorkspace, newsWorkspace, projectsWorkspace],
};
