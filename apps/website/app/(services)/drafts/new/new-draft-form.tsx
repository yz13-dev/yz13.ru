"use client";
import AutoTextarea from "@/components/auto-textarea";
import { Attachment } from "@/types/drafts";
import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { TagInput, Tags, TagsList } from "mono/components/tags";
import { create } from "zustand";

type DraftFormProps = {
  index: number;
  title: string;
  description: string;
  tags: string[];
  attachments: Attachment[];
};

type State = {
  drafts: DraftFormProps[];
};

type Actions = {
  addDraft: (draft: DraftFormProps) => void;
  removeDraft: (index: number) => void;
  updateDraft: (index: number, draft: DraftFormProps) => void;
};

const defaultDraft: DraftFormProps = {
  index: 0,
  title: "",
  description: "",
  tags: [],
  attachments: [],
};

const useDraftFormStore = create<State & Actions>()((set) => ({
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
}));

const NewDraftForm = () => {
  const drafts = useDraftFormStore((state) => state.drafts);
  const addDraft = useDraftFormStore((state) => state.addDraft);
  const uploadDraft = () => {};
  const newDraft = () => {
    const lastDraftIndex = drafts.length - 1;
    const draft: DraftFormProps = {
      index: lastDraftIndex + 1,
      title: "",
      description: "",
      tags: [],
      attachments: [],
    };
    addDraft(draft);
  };
  return (
    <div className="mx-auto max-w-lg w-full flex flex-col gap-4 items-center">
      <div className="w-full border p-4 rounded-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="size-10 rounded-full border" />
            <div className="flex flex-col">
              <span className="text-base font-medium">YZ13</span>
              <span className="text-sm text-secondary underline">123456</span>
            </div>
          </div>
          <div className="flex flex-col divide-y">
            {drafts.map((draft, index) => {
              return (
                <DraftForm key={`draft/${index}`} draft={draft} index={index} />
              );
            })}
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <Button size="sm">Запостить</Button>
          </div>
        </div>
      </div>
      <Button variant="secondary" size="icon" onClick={newDraft}>
        <PlusIcon size={16} />
      </Button>
    </div>
  );
};

type DraftProps = {
  draft: DraftFormProps;
  index: number;
};
const DraftForm = ({ draft, index }: DraftProps) => {
  const removeDraft = useDraftFormStore((state) => state.removeDraft);
  const updateDraft = useDraftFormStore((state) => state.updateDraft);
  const handleUpdateTitle = (value: string) => {
    updateDraft(index, {
      ...draft,
      title: value,
    });
  };
  const handleUpdateDescription = (value: string) => {
    updateDraft(index, {
      ...draft,
      description: value,
    });
  };
  const handleUpdateTags = (tags: string[]) => {
    updateDraft(index, {
      ...draft,
      tags,
    });
  };
  const handleRemove = () => {
    removeDraft(index);
  };
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-0 w-full">
          <Input
            value={draft.title}
            onChange={(e) => handleUpdateTitle(e.target.value)}
            placeholder="Название"
            className="w-full p-1 rounded-none !border-none !ring-0 !ring-offset-0 text-lg font-medium"
          />
          <AutoTextarea
            value={draft.description}
            onChange={(e) => handleUpdateDescription(e.target.value)}
            placeholder="Описание"
          />
        </div>
        <div className="p-1">
          {index !== 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 size-6 p-1"
              onClick={handleRemove}
            >
              <XIcon size={16} />
            </Button>
          )}
        </div>
      </div>
      <div className="w-full aspect-[4/2.5] border-dashed rounded-xl border-2 relative" />
      <Tags
        className="max-w-sm"
        tags={draft.tags}
        onTagsChange={handleUpdateTags}
      >
        <TagsList />
        <TagInput placeholder="Тэги..." />
      </Tags>
    </div>
  );
};

export default NewDraftForm;
