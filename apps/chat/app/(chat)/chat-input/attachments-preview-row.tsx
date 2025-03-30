"use client";
import { cdn } from "@/lib/cdn";
import { ChatAttachment } from "rest-api/types/attachments";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "yz13/cn";

const ImagePreview = ({
  url,
  className,
  alt = "image-preview",
}: {
  url: string;
  alt?: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className={cn("relative inline-block size-10", className)}>
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 rounded-lg bg-neutral-200" />
      )}
      <Image
        src={url}
        fill
        onLoad={() => setLoading(false)}
        className={cn(
          "!static inline-block rounded-lg",
          loading && "opacity-0",
        )}
        alt={alt}
      />
    </div>
  );
};
export const VideoPreview = ({
  url,
  autoPlay = false,
  className,
}: {
  url: string;
  autoPlay?: boolean;
  className?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className={cn("w-fit min-w-10 relative inline-block h-10", className)}>
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 rounded-lg bg-neutral-200" />
      )}
      <video
        muted
        autoPlay={autoPlay}
        controls={false}
        src={url}
        onCanPlay={() => setLoading(false)}
        onLoad={() => setLoading(false)}
        className={cn(
          "!static inline-block w-fit h-full rounded-lg",
          loading && "opacity-0",
        )}
      />
    </div>
  );
};

const AttachmentsPreviews = ({
  attachments,
  className = "",
  previewClassName = "",
}: {
  className?: string;
  previewClassName?: string;
  attachments: ChatAttachment[];
}) => {
  return (
    <div className={cn("w-fit h-10 -space-x-5", className)}>
      <AnimatePresence>
        {attachments.map((attachment) => {
          const url = cdn(`/chats/${attachment.path}`);
          if (attachment.type.startsWith("image")) {
            return (
              <ImagePreview
                key={attachment.id}
                url={url}
                className={previewClassName}
              />
            );
          }
          if (attachment.type.startsWith("video")) {
            return (
              <VideoPreview
                key={attachment.id}
                url={url}
                className={previewClassName}
              />
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
};
export { AttachmentsPreviews, ImagePreview };
