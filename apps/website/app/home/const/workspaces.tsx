import DefaultWorkspace from "../workspaces/default.workspace";

type Workspace = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  component: React.ReactNode;
};

const newsWorkspace: Workspace = {
  id: "1",
  name: "News",
  description: "Latest news from the team",
  icon: "news",
  color: "primary",
  component: <div>News</div>,
};
const defaultWorkspace: Workspace = {
  id: "2",
  name: "Default",
  description: "Default workspace",
  icon: "news",
  color: "primary",
  component: <DefaultWorkspace />,
};
const projectsWorkspace: Workspace = {
  id: "3",
  name: "Projects",
  description: "Projects I'm working on",
  icon: "news",
  color: "primary",
  component: <div>Projects</div>,
};

export const workspaces = {
  defaultId: defaultWorkspace.id,
  items: [newsWorkspace, defaultWorkspace, projectsWorkspace],
};
