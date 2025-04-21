"use client";
import { create } from "zustand";
import {
  getAudioSrc,
  getPlayed,
  getVolume,
  setPlayed,
  setVolume,
} from "./audio.store";

type State = {
  audio: HTMLAudioElement;
  loading: boolean;
  muted: boolean;
};

type Actions = {
  setMute: (muted: boolean) => void;
  setLoading: (loading: boolean) => void;
  toggleMute: () => void;
  setAudio: (src: string) => void;
};

const useAudioStore = create<State & Actions>()((set) => ({
  audio: new Audio(getAudioSrc()), // начальный источник
  muted: true,
  loading: true,
  setLoading: (loading) =>
    set((state) => {
      state.loading = loading;
      return { loading };
    }),
  setMute: (muted) =>
    set((state) => {
      state.muted = muted;
      return { muted };
    }),
  toggleMute: () =>
    set((state) => {
      state.audio.muted = !state.muted;
      return { muted: !state.muted };
    }),
  setAudio: (newSource) =>
    set((state) => {
      const audio = state.audio;
      if (audio) {
        audio.src = newSource;
        audio.load();
        const volume = getVolume();
        const muted = state.audio.muted;
        const played = getPlayed();

        audio.volume = volume;
        audio.muted = muted;

        if (played) {
          audio.play(); // если было воспроизведение, продолжаем
        }
      }
      return { audio };
    }),
}));

const getMuted = () => {
  return useAudioStore.getState().muted;
};

const stop = () => {
  const audio = useAudioStore.getState().audio;
  if (audio) {
    audio.pause();
    setPlayed(false);
  }
};

const play = () => {
  const audio = useAudioStore.getState().audio;
  if (audio) {
    audio
      .play()
      .then(() => {
        setPlayed(true);
      })
      .catch(() => {
        setPlayed(false);
      });
  }
};

const changeVolume = (volume: number) => {
  const audio = useAudioStore.getState().audio;
  if (audio) {
    setVolume(volume);
    audio.volume = volume;
  }
};

const applyNewAudioSrc = (src: string) => {
  useAudioStore.getState().setAudio(src);
};

const preflight = () => {
  const audio = useAudioStore.getState().audio;
  if (audio) {
    audio.muted = true;
    useAudioStore.getState().muted = true;
    const volume = getVolume();
    const played = getPlayed();
    audio.volume = volume;
    audio.oncanplay = () => {
      useAudioStore.getState().setLoading(false);
      if (played) {
        audio
          .play()
          .then(() => {
            setPlayed(true);
          })
          .catch(() => {
            setPlayed(false);
          });
      }
    };
  }
};

preflight();

export { applyNewAudioSrc, changeVolume, getMuted, play, stop };
export default useAudioStore;
