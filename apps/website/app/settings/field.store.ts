import { createContext } from "react";
import { create } from "zustand";

type FieldType = "input";

type Actions = {
  setEditing: (isEditing: boolean) => void;
  setType: (type: FieldType) => void;
};
type State = {
  isEditing: boolean;
  type: FieldType;
};

const useFieldStore = create<State & Actions>()((set) => ({
  isEditing: false,
  type: "input",
  setType: (type: FieldType) => set({ type }),
  setEditing: (isEditing: boolean) => set({ isEditing }),
}));

const FieldContent = createContext<State & Actions>({} as State & Actions);

export const FieldProvider = FieldContent.Provider;

const useField = () => {
  const context = useFieldStore();
  if (!context) throw new Error("useField must be used within a FieldProvider");
  return context;
};

export { useField };

export default useFieldStore;
