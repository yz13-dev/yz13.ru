"use client";
import { XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useEffect } from "react";
import { setAttachmentPreview } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import { ImagePreview, VideoPreview } from "./chat-bubble";

const Overlay = ({ children }: { children?: React.ReactNode }) => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) root.classList.add("overflow-hidden");
    return () => {
      if (root) root.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div
      className="w-full p-6 h-dvh fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setAttachmentPreview(null);
      }}
    >
      <Button
        className="absolute top-6 left-6"
        variant="secondary"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setAttachmentPreview(null);
        }}
      >
        <XIcon size={16} />
      </Button>
      <div className="max-w-screen-xl">{children}</div>
    </div>
  );
};

const AttachmentPreview = () => {
  const attachment = useChatApi((state) => state.attachmentPreview);
  if (!attachment) return null;
  if (attachment.type.startsWith("image")) {
    return (
      <Overlay>
        <ImagePreview
          onClick={() => setAttachmentPreview(null)}
          attachment={attachment}
        />
      </Overlay>
    );
  }
  if (attachment.type.startsWith("video")) {
    return (
      <Overlay>
        <VideoPreview
          onClick={() => setAttachmentPreview(null)}
          attachment={attachment}
        />
      </Overlay>
    );
  }
  return null;
};

export default AttachmentPreview;
