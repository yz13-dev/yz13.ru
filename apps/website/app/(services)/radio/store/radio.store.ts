"use client";
import { create } from "zustand";

type State = {
  audio: HTMLAudioElement;
  loading: boolean;
  played: boolean;
  muted: boolean;
  volume: number;
};

type Actions = {
  setVolume: (volume: number) => void;
  setPlay: (played: boolean) => void;
  setMute: (muted: boolean) => void;
  setLoading: (loading: boolean) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setAudio: (src: string) => void;
};

const useAudioStore = create<State & Actions>()((set) => ({
  audio: new Audio("https://channels.fluxfm.de/chillhop/stream.aac"), // начальный источник
  played: true,
  muted: true,
  volume: 0.1,
  loading: true,
  setLoading: (loading) =>
    set((state) => {
      state.loading = loading;
      return { loading };
    }),
  setPlay: (played) =>
    set((state) => {
      state.played = played;
      return { played };
    }),
  setMute: (muted) =>
    set((state) => {
      state.muted = muted;
      return { muted };
    }),

  setVolume: (volume) =>
    set((state) => {
      state.audio.volume = volume;
      return { volume };
    }),
  togglePlay: () =>
    set((state) => {
      if (state.played) {
        state.audio.pause();
      } else {
        state.audio.play();
      }
      return { played: !state.played };
    }),
  toggleMute: () =>
    set((state) => {
      state.audio.muted = !state.muted;
      return { muted: !state.muted };
    }),
  setAudio: (newSource) =>
    set((state) => {
      const audio = new Audio(newSource);
      const volume = state.audio.volume;
      const muted = state.audio.muted;

      audio.volume = volume;
      audio.muted = muted;

      if (state.played) {
        audio.play(); // если было воспроизведение, продолжаем
      }

      return { audio, played: state.played };
    }),
}));

const preflight = () => {
  const audio = useAudioStore.getState().audio;
  if (audio) {
    audio.muted = true;
    useAudioStore.getState().muted = true;
    useAudioStore.getState().setVolume(0.1);
    audio.oncanplay = () => {
      useAudioStore.getState().setLoading(false);
      audio
        .play()
        .then(() => {
          useAudioStore.getState().setPlay(true);
        })
        .catch(() => {
          useAudioStore.getState().setPlay(false);
        });
    };
  }
};

preflight();

export default useAudioStore;
