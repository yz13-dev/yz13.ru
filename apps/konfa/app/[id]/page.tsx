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
import Controls from "./dock/controls";

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
          <div className="flex items-center gap-2">
            <Participants />
          </div>
          <div className="flex items-center gap-2">
            <Controls id={id} />
          </div>
          <div className="flex items-center gap-2">
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
