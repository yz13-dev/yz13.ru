import { create } from "zustand";
import { workspaces } from "../const/workspaces";

type Action = {
  switchWorkspace: (id: string) => void;
};
type State = {
  active: string;
};
const useWorkspaceStore = create<State & Action>()((set) => ({
  active: workspaces.defaultId,
  switchWorkspace: (id: string) => {
    set({ active: id });
  },
}));

export const getWorkspace = () => useWorkspaceStore.getState().active;
export const switchWorkspace = (id: string) =>
  useWorkspaceStore.getState().switchWorkspace(id);

export default useWorkspaceStore;
