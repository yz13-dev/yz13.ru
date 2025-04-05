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

type ControlsProps = {
  id: string;
};
export default function Controls({ id }: ControlsProps) {
  const current = useRoomApi((state) => state.current);
  const currentIsNull = useMemo(() => current === null, [current]);
  const getRoomChannel = () => {
    if (!current) return null;
    return getChannel({ id, uid: current.user.id });
  };
  const handleMute = async (mute: boolean) => {
    const channel = getRoomChannel();
    if (!channel) return;
    if (!current) return;

    const payload: Participant = {
      ...current,
      isMuted: mute,
    };

    const response = await channel.send({
      event: "mute",
      type: "broadcast",
      payload,
    });
  };
  const handleCamera = async (camera: boolean) => {
    const channel = getRoomChannel();
    if (!channel) return;
    if (!current) return;

    const payload: Participant = {
      ...current,
      isVideoOff: camera,
    };

    const response = await channel.send({
      event: "camera",
      type: "broadcast",
      payload,
    });
  };
  return (
    <>
      <Button
        size="icon"
        variant={current?.isMuted ? "outline" : "default"}
        disabled={currentIsNull}
        onClick={() => {
          const muted = current ? !current.isMuted : false;
          handleMute(muted);
        }}
      >
        {current?.isMuted ? <MicOffIcon size={16} /> : <MicIcon size={16} />}
      </Button>
      <Button
        size="icon"
        variant={current?.isVideoOff ? "outline" : "default"}
        disabled={currentIsNull}
        onClick={() => {
          const camera = current ? !current.isVideoOff : false;
          handleCamera(camera);
        }}
      >
        {current?.isVideoOff ? (
          <VideoOffIcon size={16} />
        ) : (
          <VideoIcon size={16} />
        )}
      </Button>
      <Button variant="default" className="gap-2" disabled={currentIsNull}>
        <PhoneOffIcon size={16} />
      </Button>
    </>
  );
}
