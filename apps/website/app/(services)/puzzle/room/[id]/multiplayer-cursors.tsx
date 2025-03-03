"use client";

import { Coordinate, getZoom } from "@/components/canvas/api";
import { useMapApi } from "@/components/canvas/api-provider";
import { onPointerMove } from "@/components/canvas/event-api";
import {
  Cursor,
  CursorBody,
  CursorName,
  CursorPointer,
} from "@/components/cursor";
import { useUser } from "@/lib/use-auth";
import { RealtimeChannel } from "@supabase/supabase-js";
import { throttle } from "lodash";
import { useEffect, useState } from "react";
import { createClient } from "yz13/supabase/client";
import { MultiplayerProps } from "./multiplayer";
import { getUser, setCursor, useMultiplayerApi } from "./multiplayer.api";

type CursorProps = {} & MultiplayerProps;
const MAX_EVENTS_PER_SECOND = 10;
const MultiplayerCursors = ({ roomId, prefix }: CursorProps) => {
  const [user] = useUser();
  const zoom = useMapApi((state) => state.zoom);
  const cursors = useMultiplayerApi((state) => state.cursors);
  const [cursor, updateCursor] = useState<Coordinate>({ x: 0, y: 0 });
  const getChannelId = () => `${prefix}:${roomId}`;
  const getChannel = () => {
    const supabase = createClient();
    const channelId = getChannelId();
    const channel = supabase.channel(channelId);
    return channel;
  };

  useEffect(() => {
    const channel = getChannel();
    const sendCursor = throttle(
      (channel: RealtimeChannel, cursor: Coordinate) => {
        if (!user) return;
        const zoom = getZoom();
        channel.send({
          type: "broadcast",
          event: "cursor",
          payload: { cursor, uid: user?.id, zoom },
        });
      },
      1000 / MAX_EVENTS_PER_SECOND,
    );
    const onMove = (event: PointerEvent) => {
      const { x, y } = onPointerMove(event);
      updateCursor({ x, y });
      sendCursor(channel, { x, y });
    };
    channel
      .on("broadcast", { event: "cursor" }, (payload) => {
        // console.log(payload);
        const cursor = payload.payload.cursor;
        const uid = payload.payload.uid;
        if (uid === user?.id) return;
        setCursor(uid, cursor);
      })
      .subscribe((status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }
        window.addEventListener("pointermove", onMove);
      });
    return () => {
      channel.unsubscribe();
      window.removeEventListener("pointermove", onMove);
    };
  }, [user?.id]);
  return (
    <>
      {Object.keys(cursors).map((id) => {
        const user = getUser(id);
        const username = user?.user_metadata?.username ?? id.slice(0, 6);
        const cursor = cursors[id] ?? { x: 0, y: 0 };
        return (
          <Cursor
            key={`cursor-${id}`}
            style={{ left: cursor.x, top: cursor.y }}
            className="absolute"
          >
            <CursorPointer style={{ zoom }} className="text-foreground" />
            <CursorBody
              style={{ zoom }}
              className="bg-foreground text-background"
            >
              <CursorName>{username}</CursorName>
            </CursorBody>
          </Cursor>
        );
      })}
    </>
  );
};

export default MultiplayerCursors;
