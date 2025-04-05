"use client";
import {
  MicOffIcon,
  MoreVerticalIcon,
  PinIcon,
  UserIcon,
  VideoIcon,
  Volume2Icon,
  XIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "mono/components/avatar";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { cn } from "yz13/cn";
import { useMemo } from "react";
import { UserObject } from "rest-api/types/user";

export type Participant = {
  joined_at: string;
  presence_ref: string;
  user: UserObject;
  isVideoOff: boolean;
  isMuted: boolean;
  isHost: boolean;
};

type RenderParticipantVideoProps = {
  id: string;
  participant: Participant;
  isPinned?: boolean;
  onPin?: (id: string | null) => void;
};

export const ParticipantVideo = ({
  id,
  participant,
  isPinned = false,
  onPin,
}: RenderParticipantVideoProps) => {
  const isSpotlight = false;
  const name = useMemo(() => participant.user.username, [participant.user]);
  return (
    <div
      className={cn(
        "relative group bg-background",
        isPinned || isSpotlight
          ? "col-span-full max-w-4xl mx-auto col-start-1 row-start-1 row-span-2"
          : "",
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden border rounded-lg bg-muted">
        {participant.isVideoOff ? (
          <Avatar className="size-36 text-5xl border-2 rounded-full bg-background-secondary">
            <AvatarFallback className="uppercase font-medium text-center">
              {name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <VideoIcon />
          </div>
        )}
      </div>

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <div className="flex items-center h-8">
          {participant.isMuted && (
            <div className="size-8 flex items-center justify-center">
              <MicOffIcon size={16} />
            </div>
          )}
          <span className="font-medium text-base px-2">{name}</span>
          {participant.isHost && <Badge variant="outline">Организатор</Badge>}
        </div>

        <div
          className={cn(
            "hidden items-center gap-1 group-hover:flex",
            "*:size-8 *:rounded-full *:[&>svg]:size-4",
          )}
        >
          {!isPinned ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={!onPin}
              onClick={() => onPin && onPin(id)}
            >
              <PinIcon className="h-3 w-3" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={!onPin}
              onClick={() => onPin && onPin(null)}
            >
              <XIcon className="h-3 w-3" />
            </Button>
          )}

          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Volume2Icon className="h-3 w-3" />
          </Button>

          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVerticalIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
