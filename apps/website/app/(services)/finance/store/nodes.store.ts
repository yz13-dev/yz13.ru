import { Node } from "@xyflow/react";
import { create } from "zustand";

type Actions = {
  setNodes: (nodes: Node[]) => void;
};

type State = {
  nodes: Node[];
};

export const useNodeStore = create<State & Actions>()((set) => ({
  nodes: [],
  setNodes: (nodes: Node[]) => set({ nodes }),
}));

const getNodes = () => useNodeStore.getState().nodes;
const setNodes = (nodes: Node[]) => useNodeStore.getState().setNodes(nodes);

export { getNodes, setNodes };
export default useNodeStore;
