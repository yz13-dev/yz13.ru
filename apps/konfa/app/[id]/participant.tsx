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

export type Participant = {
  id: number;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isHost?: boolean;
};

export const renderParticipantVideo = (
  participant: Participant,
  index: number,
) => {
  const isPinned = false;
  const isSpotlight = false;

  return (
    <div
      key={participant.id}
      className={cn(
        "relative group",
        isPinned || isSpotlight ? "col-span-2 row-span-2" : "",
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden border rounded-lg bg-muted">
        {participant.isVideoOff ? (
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <VideoIcon />
          </div>
        )}
      </div>

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
          {participant.isMuted && <MicOffIcon className="h-3 w-3" />}
          <span>{participant.name}</span>
          {participant.isHost && (
            <Badge
              variant="outline"
              className="ml-1 border-blue-400 bg-blue-500/20 px-1 py-0 text-[10px] text-blue-100"
            >
              Организатор
            </Badge>
          )}
        </div>

        <div className="hidden items-center gap-1 rounded-full bg-black/50 px-1 text-white group-hover:flex">
          {!isPinned ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
            >
              <PinIcon className="h-3 w-3" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
            >
              <XIcon className="h-3 w-3" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
          >
            <Volume2Icon className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
          >
            <MoreVerticalIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
