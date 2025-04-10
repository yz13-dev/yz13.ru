import { useStreamStore } from "@/app/[id]/room-api/streamStore";
import { createClient } from "yz13/supabase/client";

export type WebRTCSignal = {
  type: "offer" | "answer" | "candidate";
  sdp?: string;
  candidate?: RTCIceCandidateInit;
};

// Глобальные переменные (лучше вынести в контекст/хранилище)
const peerConnections = new Map<string, RTCPeerConnection>();
const receivedCandidates = new Set<string>(); // Для дедупликации ICE

export const initializeWebRTC = (localStream: MediaStream | null) => {
  return {
    handleWebRTCSignal: (
      roomId: string,
      fromUserId: string,
      toUserId: string,
      signal: WebRTCSignal,
    ) => handleWebRTCSignal(roomId, fromUserId, toUserId, signal, localStream),
    createPeerConnection: (
      roomId: string,
      fromUserId: string,
      toUserId: string,
    ) => setupPeerConnection(roomId, fromUserId, toUserId, localStream),
    cleanup: () => cleanupConnections(),
  };
};

const handleWebRTCSignal = (
  roomId: string,
  fromUserId: string,
  toUserId: string,
  signal: WebRTCSignal,
  localStream: MediaStream | null,
) => {
  let pc = peerConnections.get(fromUserId);

  if (!pc && signal.type === "offer") {
    pc = setupPeerConnection(roomId, fromUserId, toUserId, localStream);
  }

  if (!pc) return;

  switch (signal.type) {
    case "offer":
      handleOffer(roomId, pc, fromUserId, toUserId, signal.sdp!);
      break;
    case "answer":
      pc.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp: signal.sdp! }),
      ).catch(console.error);
      break;
    case "candidate":
      handleCandidate(pc, signal.candidate!);
      break;
  }
};

const handleOffer = async (
  roomId: string,
  pc: RTCPeerConnection,
  fromUserId: string,
  toUserId: string,
  offerSdp: string,
) => {
  try {
    await pc.setRemoteDescription(
      new RTCSessionDescription({ type: "offer", sdp: offerSdp }),
    );

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    sendSignal(roomId, {
      type: "answer",
      sdp: answer.sdp!,
      fromUserId,
      toUserId,
    });
  } catch (err) {
    console.error("Offer handling failed:", err);
  }
};

const handleCandidate = async (
  pc: RTCPeerConnection,
  candidate: RTCIceCandidateInit,
) => {
  const candidateKey = JSON.stringify(candidate);
  if (receivedCandidates.has(candidateKey)) return;

  receivedCandidates.add(candidateKey);

  try {
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (err) {
    console.error("Failed to add ICE candidate:", err);
  }
};

const setupPeerConnection = (
  roomId: string,
  fromUserId: string,
  targetUserId: string,
  localStream: MediaStream | null,
) => {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      // Добавьте TURN-сервер для production
    ],
    iceTransportPolicy: "all", // Для лучшей connectivity
  });
  // Мониторинг состояния соединения
  pc.onconnectionstatechange = () => {
    console.log(`Connection state with ${targetUserId}:`, pc.connectionState);
    if (
      pc.connectionState === "disconnected" ||
      pc.connectionState === "failed"
    ) {
      cleanupConnection(targetUserId);
    }
  };

  pc.oniceconnectionstatechange = () => {
    console.log(`ICE state with ${targetUserId}:`, pc.iceConnectionState);
  };

  // Добавление локального потока
  localStream?.getTracks().forEach((track) => pc.addTrack(track, localStream));

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      sendSignal(roomId, {
        type: "candidate",
        candidate: event.candidate,
        fromUserId,
        toUserId: targetUserId,
      });
    }
  };

  pc.ontrack = (event) => {
    const [remoteStream] = event.streams;
    // Обновляем UI через Zustand
    if (remoteStream)
      useStreamStore.getState().actions.addStream(targetUserId, remoteStream);
  };

  peerConnections.set(targetUserId, pc);
  return pc;
};

export const sendSignal = (
  roomId: string,
  payload: {
    type: "offer" | "answer" | "candidate";
    sdp?: string;
    candidate?: RTCIceCandidateInit;
    fromUserId: string;
    toUserId: string;
  },
) => {
  const supabase = createClient();
  const channel = supabase.channel(`room:${roomId}`);

  channel.send({
    type: "broadcast",
    event: "webrtc_signal",
    payload: {
      fromUserId: payload.fromUserId,
      toUserId: payload.toUserId,
      signal: {
        type: payload.type,
        sdp: payload.sdp,
        candidate: payload.candidate,
      },
    },
  });
};

// Очистка соединений
const cleanupConnection = (userId: string) => {
  const pc = peerConnections.get(userId);
  if (pc) {
    pc.close();
    peerConnections.delete(userId);
    useStreamStore.getState().actions.removeStream(userId);
  }
};

export const cleanupConnections = () => {
  peerConnections.forEach((pc, userId) => {
    pc.close();
    useStreamStore.getState().actions.removeStream(userId);
  });
  peerConnections.clear();
  receivedCandidates.clear();
};
