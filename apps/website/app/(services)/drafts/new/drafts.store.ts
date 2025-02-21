import { TablesInsert } from "yz13/supabase/database";
import { create } from "zustand";

export type DraftFormProps = TablesInsert<"drafts"> & {
  index: number;
};

type State = {
  drafts: DraftFormProps[];
};

type Actions = {
  addDraft: (draft: DraftFormProps) => void;
  removeDraft: (index: number) => void;
  updateDraft: (index: number, draft: DraftFormProps) => void;
  clearDrafts: () => void;
};

const defaultDraft: DraftFormProps = {
  index: 0,
  title: "",
  description: "",
  tags: [],
  attachments: [],
};

export const useDraftFormStore = create<State & Actions>()((set) => ({
  drafts: [defaultDraft],
  addDraft: (draft) => {
    set((state) => ({
      drafts: [...state.drafts, draft],
    }));
  },
  removeDraft: (index) => {
    set((state) => ({
      drafts: state.drafts.filter((_, i) => i !== index),
    }));
  },
  updateDraft: (index, draft) => {
    set((state) => ({
      drafts: state.drafts.map((otherDraft, i) => {
        if (i === index) return draft;
        else return otherDraft;
      }),
    }));
  },
  clearDrafts: () => {
    set((state) => ({
      drafts: [defaultDraft],
    }));
  },
}));

export default useDraftFormStore;
