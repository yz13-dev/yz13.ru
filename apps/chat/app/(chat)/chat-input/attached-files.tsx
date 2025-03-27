"use client";
import { fileSize } from "@/lib/file";
import { XIcon } from "lucide-react";
import { motion } from "motion/react";
import useChatInput, { detachFile } from "./input-store";
import { ImagePreview, VideoPreview } from "./attachments-preview-row";
import { useEffect, useMemo, useState } from "react";

const AttachedFiles = () => {
  const files = useChatInput((state) => state.files);
  const handleDetachFile = (index: number) => {
    detachFile(index);
  };
  return (
    <motion.div
      id="attached-files"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full flex items-start gap-1 flex-wrap"
    >
      {files.map((file, i) => {
        return <AttachedFile key={`${file.name}-${i}`} file={file} index={i} />;
      })}
    </motion.div>
  );
};

const AttachedFile = ({ file, index = 0 }: { file: File; index?: number }) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const [url, setUrl] = useState<string | null>(null);
  const fileName = useMemo(() => {
    const nameArr = file.name.split(".");
    const name = nameArr.slice(0, nameArr.length - 1).join("-");
    const ext = nameArr[nameArr.length - 1];

    return (
      <span>
        {name}
        <span className="text-foreground">.{ext}</span>
      </span>
    );
  }, [file]);
  const handleDetachFile = (index: number) => {
    detachFile(index);
  };
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);
  return (
    <div className="pl-0.5 pr-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-secondary cursor-pointer rounded-3xl border bg-background-secondary">
      {url && isImage && (
        <ImagePreview
          url={url}
          alt={file.name}
          className="h-10 w-fit border rounded-2xl overflow-hidden"
        />
      )}
      {url && isVideo && (
        <VideoPreview
          url={url}
          className="h-10 w-fit border rounded-2xl overflow-hidden"
        />
      )}
      {!isImage && !isVideo && <div className="size-10 rounded-2xl border" />}
      <div className="flex flex-col px-1">
        {fileName}
        <span className="text-xs text-secondary">{fileSize(file.size)}</span>
      </div>
      <button onClick={() => handleDetachFile(index)}>
        <XIcon size={14} />
      </button>
    </div>
  );
};

export default AttachedFiles;
