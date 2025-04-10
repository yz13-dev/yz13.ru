import { create } from "zustand";

type StreamType = {
  stream: MediaStream;
  isMuted: boolean;
  isVideoOff: boolean;
};

type StreamsState = {
  streams: Record<string, StreamType>; // userId → StreamType
  localStream: MediaStream | null;
  actions: {
    addStream: (userId: string, stream: MediaStream) => void;
    removeStream: (userId: string) => void;
    toggleAudio: (userId: string) => void;
    toggleVideo: (userId: string) => void;
    setLocalStream: (stream: MediaStream | null) => void;
    cleanup: () => void;
  };
};

export const useStreamStore = create<StreamsState>((set) => ({
  streams: {},
  localStream: null,
  actions: {
    addStream: (userId, stream) =>
      set((state) => ({
        streams: {
          ...state.streams,
          [userId]: {
            stream,
            isMuted: false,
            isVideoOff: false,
          },
        },
      })),

    removeStream: (userId) =>
      set((state) => {
        const { [userId]: _, ...rest } = state.streams;
        return { streams: rest };
      }),

    toggleAudio: (userId) =>
      set((state) => {
        const streamObj = state.streams[userId];
        if (!streamObj) return state;

        streamObj.stream.getAudioTracks().forEach((track) => {
          track.enabled = !streamObj.isMuted;
        });

        return {
          streams: {
            ...state.streams,
            [userId]: {
              ...streamObj,
              isMuted: !streamObj.isMuted,
            },
          },
        };
      }),

    toggleVideo: (userId) =>
      set((state) => {
        const streamObj = state.streams[userId];
        if (!streamObj) return state;

        streamObj.stream.getVideoTracks().forEach((track) => {
          track.enabled = streamObj.isVideoOff; // Инвертируем состояние
        });

        return {
          streams: {
            ...state.streams,
            [userId]: {
              ...streamObj,
              isVideoOff: !streamObj.isVideoOff,
            },
          },
        };
      }),

    setLocalStream: (stream) => set({ localStream: stream }),

    cleanup: () =>
      set({
        streams: {},
        localStream: null,
      }),
  },
}));

// Оптимизированные селекторы
export const useRemoteStreams = () => useStreamStore((state) => state.streams);

export const useLocalStream = () =>
  useStreamStore((state) => state.localStream);

export const useStreamActions = () => useStreamStore((state) => state.actions);
