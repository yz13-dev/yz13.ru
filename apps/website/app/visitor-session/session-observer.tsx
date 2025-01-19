"use client";
import postVisitorSession from "@/actions/post-visitor-session";
import randomId from "@/lib/random-id";
import { useInterval } from "ahooks";
import { CircleCheckIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../account/user.store";
import { isProd } from "../login/get-url";
import useVisitorStore, {
  getVisitorId,
  setVisitorId as updateVisitorId,
} from "./visitor.store";

const SessionWatcher = () => {
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(0);
  const canBeSaved = useMemo(() => time >= 3, [time]);
  const [visitorId, setVisitorId] = useState<string | null>(getVisitorId());
  const user = useUserStore((state) => state.user);
  const [userAgent] = useState(navigator.userAgent);
  useInterval(
    () => {
      setTime((t) => t + 1);
      console.log("time: ", format());
    },
    ready ? 1000 : undefined,
  );
  const format = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else
      return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const postSession = async () => {
    if (canBeSaved && visitorId)
      await postVisitorSession({
        visitor_id: visitorId,
        duration: time,
        user_agent: userAgent ?? null,
        user_id: user?.id ?? null,
      });
  };
  useEffect(() => {
    useVisitorStore.subscribe(({ visitorId: newVisitorId }) => {
      console.log("Visitor ID: ", visitorId);
      if (newVisitorId !== visitorId) setVisitorId(newVisitorId);
    });
    if (isProd) setReady(true);
  }, []);
  useEffect(() => {
    if (canBeSaved && !visitorId) {
      // random string with 30 characters
      const newVisitorId = randomId();
      setVisitorId(newVisitorId);
      updateVisitorId(newVisitorId);
    }
    if (window) {
      const handleBeforeUnload = () => {
        if (canBeSaved && visitorId) postSession();
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [visitorId, canBeSaved, time]);
  const Timer = () => {
    return (
      <Badge className="fixed bottom-0 right-0 !rounded-br-none">
        {canBeSaved && <CircleCheckIcon size={14} className="mr-1" />}
        {visitorId && <span className="mr-1">{visitorId.slice(0, 6)}</span>}
        {format()}
      </Badge>
    );
  };
  return <></>;
  // return <>{isDev && <Timer />}</>;
};

export default SessionWatcher;
