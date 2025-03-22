import { create } from "zustand";

export type FileWithId = {
  id: string;
} & File;

type State = {
  value: string;
  tags: number[];
  showTags: boolean;
  files: FileWithId[];
  loading: boolean;
};

type Actions = {
  setValue: (value: string) => void;
};

export const useChatInput = create<State & Actions>((set) => ({
  value: "",
  showTags: false,
  tags: [],
  files: [],
  setValue: (value) => set({ value }),
  loading: false,
}));

export const setLoading = (loading: boolean) =>
  useChatInput.setState({ loading });
export const setShowTags = (showTags: boolean) =>
  useChatInput.setState({ showTags });
export const setTags = (tags: number[]) => useChatInput.setState({ tags });
export const getTags = () => useChatInput.getState().tags;
export const getFiles = () => useChatInput.getState().files;
export const setFiles = (files: FileWithId[]) => {
  const prepared = [...new Set([...files])];
  useChatInput.setState({ files: prepared });
};
export const getValue = () => useChatInput.getState().value;
export const setValue = (value: string) => useChatInput.setState({ value });
export const detachFile = (index: number) =>
  useChatInput.setState((state) => ({
    files: state.files.filter((_, i) => i !== index),
  }));

export default useChatInput;
