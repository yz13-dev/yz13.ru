"use client";

import { Release } from "@/const/releases";
import { create } from "zustand";

type State = {
  projects: Release[];
};

type Actions = {
  setProjects: (projects: Release[]) => void;
};

const useProjectsStore = create<State & Actions>()((set) => ({
  projects: [],
  setProjects: (projects: Release[]) => set({ projects }),
}));

const setProjects = (projects: Release[]) =>
  useProjectsStore.getState().setProjects(projects);
const getProjects = () => useProjectsStore.getState().projects;

export { getProjects, setProjects };

export default useProjectsStore;
