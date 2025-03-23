"use client";
import { cdn } from "@/lib/cdn";
import { ChatAttachment } from "@/types/chat";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "yz13/cn";

const ImagePreview = ({
  attachment,
  className,
}: {
  attachment: ChatAttachment;
  className?: string;
}) => {
  const url = cdn(`/chats/${attachment.path}`);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className={cn("w-full relative inline-block size-10", className)}>
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 rounded-lg bg-neutral-200" />
      )}
      <Image
        src={url}
        fill
        onLoad={() => setLoading(false)}
        className={cn("!static block rounded-lg", loading && "opacity-0")}
        alt={attachment.name}
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
          if (attachment.type.startsWith("image")) {
            return (
              <ImagePreview
                key={attachment.id}
                attachment={attachment}
                className={previewClassName}
              />
            );
          } else return null;
        })}
      </AnimatePresence>
    </div>
  );
};
export { AttachmentsPreviews, ImagePreview };
