import { create } from "zustand"


type State = {
  open: boolean
}

type Actions = {
  setOpen: (open: boolean) => void
}


export const useSettings = create<State & Actions>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
