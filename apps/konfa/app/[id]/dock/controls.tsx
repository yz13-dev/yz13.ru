"use client";

import {
  MicIcon,
  MicOffIcon,
  PhoneOffIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { useRoomApi } from "../room-api/api-provider";
import { useMemo } from "react";
import { createClient } from "yz13/supabase/client";
import { getChannel } from "../room-api/channel";
import { Participant } from "../participant";
import { useLocalStream, useStreamActions } from "../room-api/streamStore";

type ControlsProps = {
  id: string;
};
export default function Controls({ id }: ControlsProps) {
  const current = useRoomApi((state) => state.current);
  const stream = useLocalStream();
  const currentIsNull = useMemo(() => !stream, [stream]);
  const { toggleAudio, toggleVideo } = useStreamActions();
  const audioEnabled = useMemo(
    () => (stream ? (stream.getAudioTracks()[0]?.enabled ?? false) : false),
    [stream],
  );
  const videoEnabled = useMemo(
    () => (stream ? (stream.getVideoTracks()[0]?.enabled ?? false) : false),
    [stream],
  );

  const handleVideo = () => {
    if (!stream) return;
    toggleVideo(id);
  };
  const handleAudio = () => {
    if (!stream) return;
    toggleAudio(id);
  };
  return (
    <>
      <Button
        size="icon"
        variant={audioEnabled ? "default" : "outline"}
        disabled={currentIsNull}
        onClick={() => {
          handleVideo();
        }}
      >
        {audioEnabled ? <MicIcon size={16} /> : <MicOffIcon size={16} />}
      </Button>
      <Button
        size="icon"
        variant={videoEnabled ? "default" : "outline"}
        disabled={currentIsNull}
        onClick={() => {
          handleAudio();
        }}
      >
        {videoEnabled ? <VideoIcon size={16} /> : <VideoOffIcon size={16} />}
      </Button>
      <Button variant="outline" className="gap-2" disabled={currentIsNull}>
        <PhoneOffIcon size={16} />
      </Button>
    </>
  );
}
