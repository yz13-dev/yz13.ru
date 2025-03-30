import { Draft } from "rest-api/types/drafts";
import { create } from "zustand";

export type DraftFormProps = Omit<
  Draft,
  "by" | "published_at" | "id" | "created_at" | "updated_at"
> & {
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

const defaultDraft: Omit<
  DraftFormProps,
  "by" | "published_at" | "id" | "created_at" | "updated_at"
> = {
  index: 0,
  title: "",
  description: "",
  tags: [],
  attachments: [],
  animated: false,
  thumbnail: null,
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
