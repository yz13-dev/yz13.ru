import { createStore } from "zustand";
import { persist } from "zustand/middleware";

type Actions = {
  setAudioSrc: (src: string) => void;
  setVolume: (volume: number) => void;
  setPlayed: (played: boolean) => void;
};

type State = {
  played: boolean;
  audioSrc: string;
  volume: number;
};

const useAudio = createStore<State & Actions>()(
  persist(
    (set) => ({
      audioSrc: "https://channels.fluxfm.de/chillhop/stream.aac",
      volume: 0.1,
      played: false,
      setPlayed: (played) => set({ played }),
      setVolume: (volume) => set({ volume }),
      setAudioSrc: (src) => set({ audioSrc: src }),
    }),
    {
      name: "audio",
    },
  ),
);

const getVolume = () => useAudio.getState().volume;
const setVolume = (volume: number) => useAudio.getState().setVolume(volume);
const setPlayed = (played: boolean) => useAudio.getState().setPlayed(played);

const getAudioSrc = () => useAudio.getState().audioSrc;
const setAudioSrc = (src: string) => useAudio.getState().setAudioSrc(src);
const getPlayed = () => useAudio.getState().played;

export { getAudioSrc, getPlayed, getVolume, setAudioSrc, setPlayed, setVolume };

export default useAudio;
