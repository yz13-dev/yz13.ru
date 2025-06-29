"use client"

import { create } from "zustand"


type State = {
  open: boolean
}

type Actions = {
  setOpen: (open: boolean) => void
  switchOpen: () => void
}

export const useCenterStore = create<State & Actions>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  switchOpen: () => set(state => ({ open: !state.open })),
}))
