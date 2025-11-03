"use client";

import { Button } from "@yz13/ui/button";
import { CheckIcon, CopyIcon } from "@yz13/ui/icons";
import { useEffect, useState } from "react";


export default function CopyButton({ value }: { value: string }) {

  const [copied, setCopied] = useState<boolean>(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 2000);
  }, [copied])
  return (
    <Button variant="outline" size="icon" onClick={copy}>
      {
        copied
          ? <CheckIcon />
          : <CopyIcon />
      }
    </Button>
  )
}
