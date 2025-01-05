import { createContext, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

export type FieldType = "input" | "select";

type Actions = {
  setEditing: (isEditing: boolean) => void;
  setType: (type: FieldType) => void;
};
type State = {
  isEditing: boolean;
  type: FieldType;
};

type FieldStore = State & Actions;

const FieldContext = createContext<StoreApi<State & Actions>>(
  {} as StoreApi<State & Actions>,
);

const FieldProvider = ({
  children,
  type = "input",
}: {
  children: React.ReactNode;
  type?: FieldType;
}) => {
  const [store] = useState(() =>
    createStore<State & Actions>()((set) => ({
      isEditing: false,
      type: type,
      setType: (type: FieldType) => set({ type }),
      setEditing: (isEditing: boolean) => set({ isEditing }),
    })),
  );
  return (
    <FieldContext.Provider value={store}>{children}</FieldContext.Provider>
  );
};

const useField = (selector: (state: State & Actions) => any) => {
  const store = useContext(FieldContext);
  if (!store) throw new Error("useField must be used within a FieldProvider");
  return useStore(store, selector);
};

// const useFieldStore = useField((state) => state);

export { FieldContext, FieldProvider, useField };

// export default useFieldStore;
