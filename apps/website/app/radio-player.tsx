"use client";
import {
  ExternalLinkIcon,
  PauseIcon,
  PlayIcon,
  Volume,
  Volume1,
  Volume2,
  VolumeOffIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Slider } from "mono/components/slider";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "yz13/cn";
import useAudioStore from "./(services)/radio/store/radio.store";

const RadioPlayer = () => {
  const audio = useAudioStore((state) => state.audio);
  const [inFocus, setInFocus] = useState<boolean>(false);

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
    <motion.footer
      onMouseEnter={() => setInFocus(true)}
      onMouseLeave={() => setInFocus(false)}
      className="h-12 w-fit overflow-hidden fixed left-0 right-0 bottom-3 mx-auto flex flex-row items-center p-1 gap-2 rounded-full bg-background border"
    >
      <Button size="icon" className="rounded-full" onClick={handlePlaySwitch}>
        {played ? (
          <PauseIcon size={18} className="text-primary" />
        ) : (
          <PlayIcon size={18} className="text-secondary" />
        )}
      </Button>
      <AnimatePresence>
        {played && (
          <motion.div
            className={cn("flex flex-col shrink-0", !inFocus && "mr-2")}
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
      <AnimatePresence>
        {inFocus && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.5 }}
            className="flex flex-row gap-2 items-center"
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
            <Slider
              className="w-16 h-2 mr-2"
              min={0}
              max={1}
              value={[volume]}
              step={0.1}
              onValueChange={(value) => handleVolume(value[0] ?? 0)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default RadioPlayer;
