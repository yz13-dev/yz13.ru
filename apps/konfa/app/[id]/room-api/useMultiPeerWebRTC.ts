// hooks/useMultiPeerWebRTC.ts
import { useEffect, useRef, useState } from "react";

export type PeerMedia = {
  peerId: string;
  stream: MediaStream;
};

export const useMultiPeerWebRTC = ({
  userId,
  roomId,
  ws,
}: {
  userId: string;
  roomId: string;
  ws: WebSocket;
}) => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnections = useRef(new Map<string, RTCPeerConnection>());
  const [remoteStreams, setRemoteStreams] = useState<PeerMedia[]>([]);

  useEffect(() => {
    const config: RTCConfiguration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    const createPeer = (peerId: string, isInitiator: boolean) => {
      if (peerConnections.current.has(peerId)) return;

      const pc = new RTCPeerConnection(config);

      peerConnections.current.set(peerId, pc);

      localStreamRef.current?.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          ws.send(
            JSON.stringify({
              type: "ice-candidate",
              from: userId,
              to: peerId,
              candidate: e.candidate,
            }),
          );
        }
      };

      pc.ontrack = (event) => {
        setRemoteStreams((prev) => {
          const exists = prev.find((p) => p.peerId === peerId);
          const stream = event.streams[0];
          if (exists) return prev;
          if (!stream) return prev;
          return [...prev, { peerId, stream }];
        });
      };

      if (isInitiator) {
        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .then(() => {
            ws.send(
              JSON.stringify({
                type: "offer",
                from: userId,
                to: peerId,
                sdp: pc.localDescription,
              }),
            );
          });
      }
    };

    const handleSignal = async (msg: any) => {
      if (!msg || msg.from === userId) return;

      const pc = peerConnections.current.get(msg.from);

      switch (msg.type) {
        case "new-peer":
          createPeer(msg.peerId, true);
          break;
        case "offer": {
          createPeer(msg.from, false);
          const pc = peerConnections.current.get(msg.from);
          if (!pc) return;
          await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          ws.send(
            JSON.stringify({
              type: "answer",
              from: userId,
              to: msg.from,
              sdp: answer,
            }),
          );
          break;
        }
        case "answer": {
          if (!pc) return;
          await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
          break;
        }
        case "ice-candidate": {
          if (!pc) return;
          try {
            await pc.addIceCandidate(new RTCIceCandidate(msg.candidate));
          } catch (err) {
            console.error("Error adding ICE candidate", err);
          }
          break;
        }
      }
    };

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStreamRef.current = stream;

      ws.send(JSON.stringify({ type: "join", userId, roomId }));

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          handleSignal(msg);
        } catch (e) {
          console.error("Failed to parse message", e);
        }
      };
    };

    start();

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      peerConnections.current.forEach((pc) => pc.close());
      peerConnections.current.clear();
      setRemoteStreams([]);
    };
  }, [userId, roomId, ws]);

  return {
    localStream: localStreamRef.current,
    remoteStreams,
  };
};
