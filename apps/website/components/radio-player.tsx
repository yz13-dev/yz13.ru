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
  ExternalLinkIcon,
  ListIcon,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";

const RadioPlayer = () => {
  const audio = useAudioStore((state) => state.audio);
  const [openVolume, setOpenVolume] = useState<boolean>(false);

  const [volume, setPlayerVolume] = useState(getVolume());
  const [played, setPlayerPlayed] = useState(getPlayed());

  console.log(played);

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
    if (played) stop();
    else play();
  };

  useEffect(() => {
    useAudio.subscribe(({ volume, played }) => {
      setPlayerVolume(volume);
      setPlayerPlayed(played);
    });
  }, []);

  useDebounceEffect(
    () => {
      if (openVolume) setOpenVolume(false);
    },
    [openVolume, volume, muted],
    { wait: 3000 },
  );
  return (
    <div className="h-full w-fit overflow-hidden flex flex-row items-center p-1 gap-2 rounded-xl">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent className="border" side="top" sideOffset={12}>
          Нажмите чтобы включить радио
        </TooltipContent>
      </Tooltip>
      <AnimatePresence>
        {played && (
          <motion.div
            className={cn("flex flex-col shrink-0")}
            initial={{ opacity: 0, y: 50, width: 0 }}
            animate={
              played
                ? { width: "fit-content", opacity: 1, y: 0 }
                : { width: 0, opacity: 0, y: 50 }
            }
            exit={{ opacity: 0, y: 50, width: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs line-clamp-1">Радио: fluxfm</span>
            <Link
              href="https://www.fluxfm.de"
              className="text-xs flex gap-1 text-secondary hover:underline items-center"
            >
              Источник
              <ExternalLinkIcon size={10} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <Button size="icon" variant="ghost" className="rounded-full">
        <Link href="/radio">
          <ListIcon size={18} />
        </Link>
      </Button>
      {played && (
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
      )}
      {played && (
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
      )}
    </div>
  );
};

export default RadioPlayer;
