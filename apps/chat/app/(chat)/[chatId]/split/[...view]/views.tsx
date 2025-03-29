import TasksView, { TasksViewProps } from "../../tasks/view";
import ChatView, { ChatViewProps } from "../../view";

export const views = {
  chat: (props: ChatViewProps) => <ChatView {...props} />,
  tasks: (props: TasksViewProps) => <TasksView {...props} />,
};

export type ViewKey = keyof typeof views;

export const getView = (viewKey: keyof typeof views) => {
  const view = views[viewKey];
  if (!view) return null;
  else return view;
};
