"use client";
import {
  ExternalLinkIcon,
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
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "yz13/cn";
import useAudioStore from "./(services)/radio/store/radio.store";

const RadioPlayer = () => {
  const audio = useAudioStore((state) => state.audio);
  const [openVolume, setOpenVolume] = useState<boolean>(false);

  const loading = useAudioStore((state) => state.loading);
  const { played, muted, volume, setVolume, togglePlay, toggleMute } =
    useAudioStore();

  const handleVolume = (value: number) => {
    if (audio) {
      setVolume(value);
      if (muted) handleMute();
    }
  };

  const handleMute = () => {
    toggleMute();
  };

  const handlePlaySwitch = () => {
    togglePlay();
  };

  return (
    <div className="h-full w-fit overflow-hidden flex flex-row items-center p-1 gap-2 bg-background-back rounded-xl">
      <div className="h-full aspect-square rounded-lg border flex items-center justify-center">
        <RadioIcon size={18} className="text-secondary" />
      </div>
      <AnimatePresence>
        {played && (
          <motion.div
            className={cn("flex flex-col shrink-0")}
            initial={{ opacity: 0, y: 100, width: "100px" }}
            animate={
              played
                ? { width: "fit-content", opacity: 1, y: 0 }
                : { width: "0px", opacity: 0, y: 100 }
            }
            exit={{ opacity: 0, y: 100, width: "100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs line-clamp-1">Сейчас играет: fluxfm</span>
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
          onMouseEnter={() => setOpenVolume(true)}
          onMouseLeave={() => setOpenVolume(false)}
        >
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={handleMute}
          >
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
          className="w-fit rounded-full p-2 flex items-center"
          side="top"
          onMouseEnter={() => setOpenVolume(true)}
          onMouseLeave={() => setOpenVolume(false)}
        >
          <Slider
            className="w-20 h-2"
            min={0}
            max={1}
            value={[volume]}
            step={0.05}
            onValueChange={(value) => handleVolume(value[0] ?? 0)}
          />
          <span className="text-xs text-center w-5 text-secondary mx-2">
            {(volume * 100).toFixed()}
          </span>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RadioPlayer;
