"use client";
import useAudio, {
  getPlayed,
  getVolume,
} from "@/app/(services)/radio/store/audio.store";
import useAudioStore, {
  changeVolume,
  play,
  stop,
} from "@/app/(services)/radio/store/radio.store";
import { useDebounceEffect } from "ahooks";
import {
  Loader2Icon,
  PauseIcon,
  PlayIcon,
  Volume,
  Volume1,
  Volume2,
  VolumeOffIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { Slider } from "mono/components/slider";
import { useEffect, useState } from "react";

const RadioPlayer = () => {
  const loading = useAudioStore((state) => state.loading);

  const [played, setPlayerPlayed] = useState<boolean>(getPlayed());
  const [volume, setPlayerVolume] = useState(getVolume());
  const audio = useAudioStore((state) => state.audio);
  const { muted, toggleMute } = useAudioStore();
  const [openVolume, setOpenVolume] = useState<boolean>(false);

  const handlePlaySwitch = () => {
    if (played) {
      stop();
    } else {
      play();
    }
  };
  const handleVolume = (value: number) => {
    if (audio) {
      changeVolume(value);
      if (muted) toggleMute();
    }
  };
  useEffect(() => {
    useAudio.subscribe(({ volume, played, audioSrc }) => {
      setPlayerVolume(volume);
      setPlayerPlayed(played);
    });
  }, []);
  useDebounceEffect(
    () => {
      if (openVolume) setOpenVolume(false);
    },
    [openVolume, volume, muted],
    { wait: 1500 },
  );
  return (
    <div className="flex items-center gap-2 rounded-full border bg-background">
      <button
        disabled={loading}
        onClick={handlePlaySwitch}
        className="text-foreground size-6 flex items-center justify-center rounded-full border-r hover:bg-neutral-100 cursor-pointer hover:text-foreground transition-colors"
      >
        {loading ? (
          <Loader2Icon size={14} className="animate-spin" />
        ) : played ? (
          <PauseIcon size={14} />
        ) : (
          <PlayIcon size={14} />
        )}
      </button>
      <span className="text-xs text-foreground">Радио</span>
      <Popover open={openVolume} onOpenChange={setOpenVolume}>
        <PopoverTrigger
          asChild
          onClick={() => toggleMute()}
          onPointerEnter={() => setOpenVolume(true)}
        >
          <button className="text-foreground size-6 flex items-center justify-center rounded-full border-l hover:bg-neutral-100 cursor-pointer hover:text-foreground transition-colors">
            {muted ? (
              <VolumeOffIcon size={14} />
            ) : volume > 0.25 && volume <= 0.5 ? (
              <Volume1 size={14} />
            ) : volume > 0.5 ? (
              <Volume2 size={14} />
            ) : (
              <Volume size={14} />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit rounded-full py-1 px-2 flex items-center gap-1"
          side="top"
        >
          <Slider
            className="w-20 h-1"
            min={0}
            max={1}
            value={[volume]}
            step={0.01}
            onValueChange={(value) => handleVolume(value[0] ?? 0)}
          />
          <span className="text-xs text-center w-5 text-foreground">
            {(volume * 100).toFixed()}
          </span>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RadioPlayer;
