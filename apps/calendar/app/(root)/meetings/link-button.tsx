"use client";

import { getBookingLink } from "@/lib/booking-link";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useState } from "react";

export default function LinkButton({
  uid,
  disabled = false,
  className = ""
}: {
  uid?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const buttonDisabled = disabled || loading || copied || !uid;
  const handleCopy = () => {
    if (!uid) return;
    const link = getBookingLink(uid);
    setLoading(true);
    try {
      navigator.clipboard.writeText(link).then(() => setCopied(true));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => setTimeout(() => setCopied(false), 1000));
    }
  };
  return (
    <Button
      variant="secondary"
      size="sm"
      className={className}
      disabled={buttonDisabled}
      onClick={handleCopy}
    >
      {copied ? "Скопировано" : "Скопировать"}
      {copied ? <CheckIcon className="size-[14px]" /> : <CopyIcon className="size-[14px]" />}
    </Button>
  );
}
