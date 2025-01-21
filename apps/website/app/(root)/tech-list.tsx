import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import Image from "next/image";

const list = [
  {
    label: "NextJS",
    img: {
      light: "/tech/nextjs.png",
      dark: "/tech/nextjs-dark.png",
    },
    url: "https://nextjs.org/",
  },
  {
    label: "TypeScript",
    img: {
      light: "/tech/typescript.png",
      dark: "/tech/typescript-dark.png",
    },
    url: "https://www.typescriptlang.org/",
  },
  {
    label: "TailwindCSS",
    img: {
      light: "/tech/tailwindcss.png",
      dark: "/tech/tailwindcss-dark.png",
    },
    url: "https://tailwindcss.com/",
  },
  {
    label: "React",
    img: {
      light: "/tech/react.png",
      dark: "/tech/react-dark.png",
    },
    url: "https://reactjs.org/",
  },
  {
    label: "Vite",
    img: {
      light: "/tech/vite.png",
      dark: "/tech/vite-dark.png",
    },
    url: "https://vitejs.dev/",
  },
];

const TechList = () => {
  return (
    <div className="w-full space-y-3">
      <span className="text-secondary text-base font-medium">Мой стек:</span>
      <ul className="flex w-fit flex-row p-1 rounded-xl bg-yz-neutral-100 gap-1 border border-yz-neutral-200">
        {list.map(({ label, img, url }) => {
          return (
            <Tooltip delayDuration={100} key={label + "/" + url}>
              <li className="group cursor-default size-10 flex items-center justify-center transition-colors rounded-lg bg-yz-neutral-200 hover:bg-yz-neutral-300">
                <TooltipTrigger className="relative size-6">
                  <Image
                    src={img.light}
                    alt="NextJS"
                    fill
                    className="light-mode-image"
                  />
                  <Image
                    src={img.dark}
                    alt="NextJS"
                    fill
                    className="dark-mode-image"
                  />
                </TooltipTrigger>
              </li>
              <TooltipContent side="bottom" className="border">
                {label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </ul>
    </div>
  );
};

export default TechList;
