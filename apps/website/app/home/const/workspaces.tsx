import BlogWorkspace from "../workspaces/blog.workspace";
import DefaultWorkspace from "../workspaces/default.workspace";


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
  component: <div>Projects</div>,
};

export const workspaces = {
  defaultId: defaultWorkspace.id,
  items: [defaultWorkspace, newsWorkspace, projectsWorkspace],
};
