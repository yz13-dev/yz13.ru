import { create } from "zustand";
import { OutputRecord } from "./terminal";

type State = {
  output: OutputRecord[];
};

type Action = {
  setOutput: (output: OutputRecord[]) => void;
};

const useOutputStore = create<State & Action>()((set) => ({
  output: [],
  setOutput: (output: OutputRecord[]) => set(() => ({ output })),
}));

const getOutput = () => useOutputStore.getState().output;
const setOutput = (output: OutputRecord[]) =>
  useOutputStore.setState({ output });
const pushOutput = (output: OutputRecord) => {
  const prev = useOutputStore.getState().output;
  setOutput([...prev, output]);
};

export { getOutput, pushOutput, setOutput };

export default useOutputStore;
