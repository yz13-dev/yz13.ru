export type Radio = {
  id: string;
  name: string;
  sourceLink?: string;
  src: string;
  tags: string[];
};

export const radios: Radio[] = [
  {
    id: "1",
    name: "Flux FM Chillhop",
    sourceLink: "https://www.fluxfm.de",
    src: "https://channels.fluxfm.de/chillhop/stream.aac",
    tags: ["chillhop", "chill"],
  },
  {
    id: "2",
    name: "Flux FM Chillout Radio",
    sourceLink: "https://www.fluxfm.de",
    src: "https://channels.fluxfm.de/chillout-radio/stream.aac",
    tags: ["chillout", "chill"],
  },
  {
    id: "3",
    name: "Flux FM Electronic Chillout",
    sourceLink: "https://www.fluxfm.de",
    src: "https://channels.fluxfm.de/electronic-chillout/stream.aac",
    tags: ["electronic", "chillout", "chill"],
  },
  {
    id: "4",
    name: "Flux FM HipHop Classics",
    sourceLink: "https://www.fluxfm.de",
    src: "https://channels.fluxfm.de/boom-fm-classics/stream.aac",
    tags: ["hiphop"],
  },
  {
    id: "5",
    name: "Flux FM Xjazz",
    sourceLink: "https://www.fluxfm.de",
    src: "https://channels.fluxfm.de/x-jazz/stream.aac",
    tags: ["x-jazz", "jazz"],
  },
];
