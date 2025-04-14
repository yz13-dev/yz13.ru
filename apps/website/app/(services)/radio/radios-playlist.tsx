"use client";
import { ExternalLinkIcon, PlayIcon, RadioIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Radio, radios } from "./radios-list";
import useAudio, { getPlayed, setAudioSrc } from "./store/audio.store";
import { applyNewAudioSrc, play, stop } from "./store/radio.store";

const RadiosPlaylist = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  useEffect(() => {
    useAudio.subscribe(({ audioSrc }) => {
      setCurrentPlaying(audioSrc);
    });
  }, []);
  return (
    <section className="w-full">
      <ul className="border rounded-xl divide-y">
        {radios.map((radio, index) => {
          return (
            <li key={radio.id + "-" + index} className="w-full p-3">
              <RadioItem
                radio={radio}
                isPlaying={currentPlaying === radio.src}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const RadioItem = ({
  radio,
  isPlaying,
}: {
  radio: Radio;
  isPlaying?: boolean;
}) => {
  const changeSrc = (src: string) => {
    setAudioSrc(src);
    applyNewAudioSrc(src);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <button
          className="size-12 rounded-xl border flex items-center justify-center"
          onClick={() => {
            if (isPlaying) {
              const playing = getPlayed();
              if (playing) stop();
              else play();
            } else {
              changeSrc(radio.src);
            }
          }}
        >
          {isPlaying ? (
            <RadioIcon size={18} className="animate-pulse text-foreground" />
          ) : (
            <PlayIcon size={18} className="text-foreground" />
          )}
        </button>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{radio.name}</span>
          {radio.sourceLink && (
            <Link
              href={radio.sourceLink}
              className="text-xs flex gap-1 text-foreground hover:underline items-center"
            >
              Источник
              <ExternalLinkIcon size={10} />
            </Link>
          )}
          <div className="flex items-start gap-1 flex-wrap mt-2">
            {radio.tags.map((tag, index) => {
              return (
                <span
                  key={radio.id + "-" + index}
                  className="border rounded-full px-2 py-0.5 text-xs text-foreground"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadiosPlaylist;
