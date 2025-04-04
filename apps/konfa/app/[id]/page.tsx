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
import { Participant, renderParticipantVideo } from "./participant";

const participants: Participant[] = [
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

export default function page() {
  return (
    <Wrapper>
      <div className="w-full h-[calc(100dvh-var(--controls-height))] flex flex-col items-center justify-center p-6">
        <div
          className={cn(
            "grid h-fit max-h-full gap-2 *:w-full *:h-full w-full *:aspect-video",
            participants.length <= 3 && "grid-cols-2",
            participants.length >= 3 &&
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
