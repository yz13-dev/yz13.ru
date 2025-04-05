"use client";

import { MicIcon, PhoneOffIcon, VideoIcon } from "lucide-react";
import { Button } from "mono/components/button";

const Controls = () => {
  return (
    <>
      <Button size="icon" variant="outline">
        <MicIcon size={16} />
      </Button>
      <Button size="icon" variant="outline">
        <VideoIcon size={16} />
      </Button>
      <Button variant="secondary" className="gap-2">
        <PhoneOffIcon size={16} />
        <span>Отключиться</span>
      </Button>
    </>
  );
};
