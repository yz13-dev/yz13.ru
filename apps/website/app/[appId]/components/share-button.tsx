"use client";
import { Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { useState } from "react";

export default function ShareButton({ appId }: { appId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const disabled = loading || copied;

  const handleCopy = async () => {
    setLoading(true);
    try {
      await navigator.clipboard.writeText(`https://yz13.ru/${appId}`);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <Button variant="ghost" disabled={disabled} onClick={handleCopy}>
      {loading && <Loader2Icon size={16} />}
      {copied ? "Скопировано" : "Поделиться"}
    </Button>
  );
}
