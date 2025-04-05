import User from "@/components/user";
import { LinkIcon, MicIcon, PhoneOffIcon, VideoIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import Footer from "./dock/footer";
import Participants from "./dock/participants";
import Wrapper from "./dock/wrapper";
import ParticipantsGrid from "./participants-grid";
import CopyLinkButton from "./dock/copy-link-button";

type PageProps = {
  params: {
    id: string;
  };
};
export default function page({ params }: PageProps) {
  const id = params.id;
  return (
    <Wrapper>
      <div className="w-full h-[calc(100dvh-var(--controls-height))] mx-auto md:px-[2.5%] px-[5%] py-3 flex flex-col items-center justify-center">
        <ParticipantsGrid id={id} />
      </div>
      <Footer>
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 px-6">
            <Participants />
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
            <CopyLinkButton id={id} />
            <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
              <User />
            </Suspense>
          </div>
        </div>
      </Footer>
    </Wrapper>
  );
}
