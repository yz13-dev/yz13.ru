"use client";
import { createDraft } from "@/actions/drafts/drafts";
import AutoTextarea from "@/components/auto-textarea";
import { CheckIcon, Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { TagInput, Tags, TagsList } from "mono/components/tags";
import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import useDraftFormStore, { DraftFormProps } from "./drafts.store";

type FormProps = {
  uid?: string;
};
const NewDraftForm = ({ uid }: FormProps) => {
  const drafts = useDraftFormStore((state) => state.drafts);
  const addDraft = useDraftFormStore((state) => state.addDraft);
  const clearDrafts = useDraftFormStore((state) => state.clearDrafts);

  const [loading, setLoading] = useState<boolean>(false);
  const [uploadIndex, setUploadIndex] = useState<number | null>(null);

  const router = useRouter();

  const disabled = useMemo(() => {
    if (!uid) return true;
    if (loading) return true;
    if (drafts.length === 0) return true;
    if (drafts.some((draft) => draft.title.length === 0)) return true;
    else return false;
  }, [drafts, loading, uid]);

  const handlePublish = async () => {
    const length = drafts.length;
    if (length === 0) return;
    for (let i = 0; i < length; i++) {
      const draft = drafts[i];
      if (!draft) return;
      setUploadIndex(i);
      setLoading(true);
      await createDraft({ ...draft, by: uid });
    }
    setLoading(false);
    setUploadIndex(null);

    router.push("/drafts");
  };

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

  useEffect(() => {
    return () => {
      setUploadIndex(null);
      clearDrafts();
    };
  }, []);
  return (
    <div className="mx-auto max-w-lg w-full flex flex-col gap-4 items-center">
      <div className="w-full border p-4 rounded-2xl">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <div className="size-10 rounded-full border" />
            <div className="flex flex-col">
              <span className="text-base font-medium">YZ13</span>
              <span className="text-sm text-secondary underline">123456</span>
            </div>
          </div>
          <div className="flex flex-col divide-y">
            {drafts.map((draft, index) => {
              if (uploadIndex !== null)
                return (
                  <div key={`draft/${index}`} className="w-full relative h-fit">
                    {uploadIndex === index && loading && (
                      <div className="absolute top-0 left-0 w-full h-full bg-background/80 flex items-center justify-center">
                        <Loader2Icon size={24} className="animate-spin" />
                      </div>
                    )}
                    {uploadIndex > index && loading && (
                      <div className="absolute top-0 left-0 w-full h-full bg-background/80 flex items-center justify-center">
                        <CheckIcon size={24} />
                      </div>
                    )}
                    <DraftForm draft={draft} index={index} />
                  </div>
                );
              return <DraftForm draft={draft} index={index} />;
            })}
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              size="sm"
              disabled={disabled}
              className="gap-2"
              onClick={handlePublish}
            >
              {loading && <Loader2Icon size={16} className="animate-spin" />}
              {loading ? "Постим..." : "Запостить"}
            </Button>
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
            value={draft.description ?? ""}
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
