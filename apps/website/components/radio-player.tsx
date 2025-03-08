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
  RadioIcon,
  Volume,
  Volume1,
  Volume2,
  VolumeOffIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { Slider } from "mono/components/slider";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";

const RadioPlayer = () => {
  const audio = useAudioStore((state) => state.audio);
  const [src, setSrc] = useState<string>(audio?.src);
  const [openVolume, setOpenVolume] = useState<boolean>(false);

  const [volume, setPlayerVolume] = useState(getVolume());
  const [played, setPlayerPlayed] = useState(getPlayed());

  const loading = useAudioStore((state) => state.loading);
  const { muted, toggleMute } = useAudioStore();

  const handleVolume = (value: number) => {
    if (audio) {
      changeVolume(value);
      if (muted) handleMute();
    }
  };

  const handleMute = () => {
    toggleMute();
  };

  const handlePlaySwitch = () => {
    if (played) {
      stop();
    } else {
      play();
    }
  };

  useEffect(() => {
    useAudio.subscribe(({ volume, played, audioSrc }) => {
      setPlayerVolume(volume);
      setPlayerPlayed(played);
      setSrc(audioSrc);
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
    <div className="h-full w-fit overflow-hidden flex flex-row items-center p-0 rounded-xl">
      <div
        className={cn(
          "h-full aspect-square rounded-lg border flex items-center justify-center bg-background-back",
          !played && "cursor-pointer",
        )}
        onClick={() => {
          if (!played) handlePlaySwitch();
        }}
      >
        <RadioIcon
          size={18}
          className={cn(
            "",
            played ? "animate-pulse text-foreground" : "text-secondary",
          )}
        />
      </div>
      <div className="px-2 flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          disabled={loading}
          onClick={handlePlaySwitch}
        >
          {loading ? (
            <Loader2Icon size={18} className="text-foreground animate-spin" />
          ) : played ? (
            <PauseIcon size={18} className="text-foreground" />
          ) : (
            <PlayIcon size={18} className="text-secondary" />
          )}
        </Button>
        <Popover open={openVolume} onOpenChange={setOpenVolume}>
          <PopoverTrigger
            asChild
            onClick={() => handleMute()}
            onPointerEnter={() => setOpenVolume(true)}
          >
            <Button size="icon" variant="ghost" className="rounded-full">
              {muted ? (
                <VolumeOffIcon size={18} />
              ) : volume > 0.25 && volume <= 0.5 ? (
                <Volume1 size={18} />
              ) : volume > 0.5 ? (
                <Volume2 size={18} />
              ) : (
                <Volume size={18} />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit rounded-full py-2 px-4 flex items-center gap-2"
            side="top"
          >
            <Slider
              className="w-24 h-2"
              min={0}
              max={1}
              value={[volume]}
              step={0.01}
              onValueChange={(value) => handleVolume(value[0] ?? 0)}
            />
            <span className="text-xs text-center w-5 text-secondary">
              {(volume * 100).toFixed()}
            </span>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default RadioPlayer;
