"use client";

import { fileSize } from "@/lib/file";
import { File, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { cn } from "yz13/cn";

type FileUploadProps = {
  className?: string;
  file: File | null;
  onFile?: (file: File | null) => void;
};
export function FileUpload({ className = "", onFile, file }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const handlePreview = useCallback(
    (file: File | null) => {
      const isImage = file?.type.startsWith("image/");
      if (file && isImage) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        return reader.result as string;
      } else return null;
    },
    [file],
  );

  const size = useMemo(() => file?.size ?? 0, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) handleFile(file);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (onFile) onFile(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    }
  };

  const handleRemoveFile = () => {
    if (onFile) onFile(null);
  };

  useEffect(() => {
    if (file) handlePreview(file);
  }, [file]);
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        file ? "h-64" : "h-48 border-2 border-dashed",
        isDragging ? "border-foreground" : "",
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <>
          <div className="absolute top-2 right-2 z-10">
            <Button
              onClick={handleRemoveFile}
              variant="secondary"
              className="p-1 size-7 rounded-full"
            >
              <XIcon size={16} />
            </Button>
          </div>
          {preview ? (
            <Image
              fill
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full !static object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <File size={24} className="text-secondary" />
            </div>
          )}
          {size && (
            <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs bg-background boder">
              {fileSize(size)}
            </span>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-sm text-gray-600 mb-2">Перетащите файл сюда или</p>
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center rounded-md px-3 py-2 hover:underline text-sm font-medium"
          >
            Выберите файл
          </label>
        </div>
      )}
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
