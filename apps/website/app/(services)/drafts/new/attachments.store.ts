import { create } from "zustand";

export type Attachment = {
  id: string;
  url: string;
  size: number;
  content_type: string;
  created_at: string;
};

type State = {
  attachments: Attachment[];
};

type Actions = {
  addAttachment: (attachment: Attachment) => void;
  removeAttachment: (attachment: Attachment) => void;
  clearAttachments: () => void;
};

const useAttachmentsStore = create<State & Actions>((set) => ({
  attachments: [],
  addAttachment: (attachment) => {
    set((state) => ({
      attachments: [...state.attachments, attachment],
    }));
  },
  removeAttachment: (attachment) => {
    set((state) => ({
      attachments: state.attachments.filter((a) => a.id !== attachment.id),
    }));
  },
  clearAttachments: () => {
    set((state) => ({
      attachments: [],
    }));
  },
}));

export default useAttachmentsStore;
