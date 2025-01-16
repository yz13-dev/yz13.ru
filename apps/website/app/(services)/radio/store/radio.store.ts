import { create } from "zustand";

type State = {
  audio: HTMLAudioElement;
  played: boolean;
  muted: boolean;
  volume: number;
};

type Actions = {
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setAudio: (src: string) => void;
};

const useAudioStore = create<State & Actions>()((set) => ({
  audio: new Audio("https://channels.fluxfm.de/chillhop/stream.aac"), // начальный источник
  played: true,
  muted: true,
  volume: 0.1,
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
    audio.play();
  }
};

preflight();

export default useAudioStore;
