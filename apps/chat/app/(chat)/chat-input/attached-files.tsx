"use client";
import { XIcon } from "lucide-react";
import { motion } from "motion/react";
import useChatInput, { detachFile } from "./input-store";

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
        return (
          <div
            key={`${file.name}-${i}`}
            className="px-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-secondary cursor-pointer rounded-full border bg-background-secondary"
          >
            <button onClick={() => handleDetachFile(i)}>
              <XIcon size={14} />
            </button>
            <span>{file.name}</span>
          </div>
        );
      })}
    </motion.div>
  );
};

export default AttachedFiles;
