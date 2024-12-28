import { create } from "zustand";

type Workspace = {
  currency: string;
  currencySign: string | null;
};

type Actions = {
  setWorkspace: (workspace: Workspace | null) => void;
};

type State = {
  workspace: Workspace | null;
};

type WorkspaceStore = Actions & State;

export const useWorkspaceStore = create<WorkspaceStore>()((set, get) => ({
  workspace: null,
  setWorkspace: (workspace) => {
    set({ workspace });
  },
}));

export default useWorkspaceStore;
