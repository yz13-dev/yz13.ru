import { create } from "zustand"
import { Json } from "../schemas/link.schema"

export const defaultJson: Json = {
  items: [],
  user: {
    avatar_url: "",
    username: "",
  },
}

type State = {
  json: Json
}

type Actions = {
  setJson: (json: Json) => void
}

export const useJsonStore = create<State & Actions>()((set) => ({
  json: defaultJson,
  setJson: (json) => set({ json }),
}))
