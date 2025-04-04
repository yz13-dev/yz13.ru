import {
  LinkIcon,
  MicIcon,
  MicOffIcon,
  MoreVerticalIcon,
  PhoneOffIcon,
  PinIcon,
  UserIcon,
  VideoIcon,
  Volume2Icon,
  XIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "mono/components/avatar";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { CSSProperties } from "react";
import Footer from "./dock/footer";
import Wrapper from "./dock/wrapper";
import { cn } from "yz13/cn";

const participants = [
  {
    id: 1,
    name: "Алексей К.",
    avatar: "AK",
    isMuted: false,
    isVideoOff: false,
    isHost: true,
  },
  { id: 2, name: "Мария С.", avatar: "MC", isMuted: true, isVideoOff: false },
];

const renderParticipantVideo = (
  participant: (typeof participants)[0],
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

export default function page() {
  return (
    <Wrapper>
      <div className="w-full h-[calc(100dvh-var(--controls-height))] flex flex-col items-center justify-center p-6">
        <div
          className={cn(
            "grid h-fit max-h-full gap-2 *:w-full *:h-full w-full *:aspect-video",
            participants.length === 1 && "grid-cols-1 *:min-h-80",
            participants.length === 2 && "grid-cols-2 *:min-h-64",
            participants.length === 3 && "grid-cols-3 *:min-h-64",
            participants.length >= 4 &&
              "auto-rows-fr grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {participants.map((participant, index) =>
            renderParticipantVideo(participant, index),
          )}
        </div>
      </div>
      <Footer>
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 px-6">
            <div className="flex items-center text-secondary text-sm gap-2">
              <UserIcon size={16} />
              <span>{participants.length}/10</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
          </div>
          <div className="flex items-center gap-2 px-6">
            <Button variant="outline" className="gap-2">
              <LinkIcon size={16} />
              <span>Скопировать ссылку</span>
            </Button>
          </div>
        </div>
      </Footer>
    </Wrapper>
  );
}
