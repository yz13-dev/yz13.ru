import { create } from "zustand";

export type AttachmentFile = {
  file: File;
  id: string;
};

type State = {
  files: AttachmentFile[];
};

type Actions = {
  addFile: (file: AttachmentFile) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
};

const useFilesStore = create<State & Actions>((set) => ({
  files: [],
  addFile: (file) => {
    set((state) => ({
      files: [...state.files, file],
    }));
  },
  removeFile: (index) => {
    set((state) => ({
      files: state.files.filter((_, i) => i !== index),
    }));
  },
  clearFiles: () => {
    set((state) => ({
      files: [],
    }));
  },
}));

const addFile = (file: AttachmentFile) =>
  useFilesStore.getState().addFile(file);
const removeFile = (index: number) =>
  useFilesStore.getState().removeFile(index);
const clearFiles = () => useFilesStore.getState().clearFiles();

export { addFile, clearFiles, removeFile };

export default useFilesStore;
