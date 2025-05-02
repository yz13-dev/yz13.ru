"use client";

import { Button } from "mono/components/button";
import { useState } from "react";
import { isDev } from "yz13/env";

export default function LinkButton({
  uid,
  disabled = false,
}: {
  uid?: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const buttonDisabled = disabled || loading || copied || !uid;
  const handleCopy = () => {
    const domain = isDev ? "localhost:3001" : "calendar.yz13.ru";
    const link = `https://${domain}/booking/${uid}`;
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
    <Button variant="secondary" disabled={buttonDisabled} onClick={handleCopy}>
      {copied ? "Скопировано" : "Скопировать ссылку"}
    </Button>
  );
}
