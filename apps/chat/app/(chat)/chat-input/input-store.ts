import { create } from "zustand";

export type FileWithId = {
  id: string;
} & File;

type State = {
  value: string;
  tags: number[];
  files: FileWithId[];
};

type Actions = {
  setValue: (value: string) => void;
};

export const useChatInput = create<State & Actions>((set) => ({
  value: "",
  tags: [],
  files: [],
  setValue: (value) => set({ value }),
}));

export const setTags = (tags: number[]) => useChatInput.setState({ tags });
export const getFiles = () => useChatInput.getState().files;
export const setFiles = (files: FileWithId[]) => {
  const prepared = [...new Set([...files])];
  useChatInput.setState({ files: prepared });
};
export const detachFile = (index: number) =>
  useChatInput.setState((state) => ({
    files: state.files.filter((_, i) => i !== index),
  }));

export default useChatInput;
