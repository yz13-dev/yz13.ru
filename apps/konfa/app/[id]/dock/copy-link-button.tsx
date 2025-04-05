"use client";
import { useTimeout } from "ahooks";
import { CheckIcon, LinkIcon, Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { useState } from "react";

export default function CopyLinkButton({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = async () => {
    const url = `https://konfa.yz13.ru/${id}`;
    setLoading(true);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useTimeout(
    () => {
      if (copied) setCopied(false);
    },
    copied ? 1000 : undefined,
  );
  return (
    <Button
      disabled={copied ?? loading}
      variant="outline"
      className="gap-2"
      onClick={handleCopy}
    >
      {loading ? (
        <Loader2Icon size={16} />
      ) : copied ? (
        <CheckIcon size={16} />
      ) : (
        <LinkIcon size={16} />
      )}
      <span>
        {loading
          ? "Копирование..."
          : copied
            ? "Скопировано"
            : "Скопировать ссылку"}
      </span>
    </Button>
  );
}
