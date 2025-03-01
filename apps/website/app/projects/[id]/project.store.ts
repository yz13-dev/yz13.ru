import { Release } from "@/const/releases";
import { create } from "zustand";

type State = {
  release: Release | null;
  edit: boolean;
};

type Actions = {
  setRelease: (release: Release | null) => void;
  setEdit: (edit: boolean) => void;
};

const useReleaseStore = create<State & Actions>()((set) => ({
  release: null,
  edit: false,
  setRelease: (release: Release | null) => set({ release }),
  setEdit: (edit: boolean) => set({ edit }),
}));

const getRelease = useReleaseStore.getState().release;
const setRelease = (release: Release | null) =>
  useReleaseStore.getState().setRelease(release);

const getEdit = () => useReleaseStore.getState().edit);
const swithEdit = () => useReleaseStore.getState().setEdit(!getEdit());
const setEdit = (edit: boolean) =>
  useReleaseStore.getState().setEdit(edit);

export { getRelease, setRelease, getEdit, swithEdit, setEdit };
export default useReleaseStore;
