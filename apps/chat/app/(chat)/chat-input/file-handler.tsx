"use client";
import randomId from "@/lib/random-id";
import { useThrottleFn } from "ahooks";
import { PaperclipIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useEffect, type ChangeEvent } from "react";
import { cn } from "yz13/cn";
import { FileWithId, getFiles, setFiles } from "./input-store";

type FileHandlerProps = {
  className?: string;
  watchId?: string;
};
export function FileHandler({ className = "", watchId }: FileHandlerProps) {
  const addFile = (file: File) => {
    const currentFiles = getFiles();
    const fileWithId = file as FileWithId;
    fileWithId.id = randomId(10);
    setFiles([...currentFiles, fileWithId]);
  };
  const addFiles = (files: File[]) => {
    files.forEach((file) => addFile(file));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handle file - change");
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) handleFile(file);
    }
  };

  const handleFile = (selectedFile: File) => {
    addFile(selectedFile);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = useThrottleFn(
    (e: DragEvent) => {
      e.preventDefault();
      console.log("handle drop");
      if (e.dataTransfer?.files) {
        const files = e.dataTransfer.files;
        const collectedFiles: File[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file && file.type.startsWith("image")) {
            collectedFiles.push(file);
          }
        }
        if (collectedFiles.length > 0) addFiles(collectedFiles);
      }
    },
    { wait: 100 },
  );

  useEffect(() => {
    if (!watchId) return;
    const watched = document.getElementById(watchId);
    if (!watched) return;
    watched.addEventListener("dragover", (e) => handleDragOver(e));
    watched.addEventListener("dragleave", (e) => handleDragLeave(e));
    watched.addEventListener("drop", (e) => handleDrop.run(e));
    return () => {
      watched.removeEventListener("dragover", (e) => handleDragOver(e));
      watched.removeEventListener("dragleave", (e) => handleDragLeave(e));
      watched.removeEventListener("drop", (e) => handleDrop.run(e));
    };
  }, [watchId]);
  return (
    <div className={cn("relative size-6 overflow-hidden", className)}>
      <Button variant="secondary" size="sm" className="size-6 p-0.5" asChild>
        <label htmlFor="file-upload">
          <PaperclipIcon size={14} />
        </label>
      </Button>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
      />
    </div>
  );
}
