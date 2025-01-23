import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import Image from "next/image";
import nextjsDark from "public/tech/nextjs-dark.png";
import nextjs from "public/tech/nextjs.png";
import reactDark from "public/tech/react-dark.png";
import react from "public/tech/react.png";
import tailwindcssDark from "public/tech/tailwindcss-dark.png";
import tailwindcss from "public/tech/tailwindcss.png";
import typescriptDark from "public/tech/typescript-dark.png";
import typescript from "public/tech/typescript.png";
import viteDark from "public/tech/vite-dark.png";
import vite from "public/tech/vite.png";

const list = [
  {
    label: "NextJS",
    img: {
      light: nextjs,
      dark: nextjsDark,
    },
    url: "https://nextjs.org/",
  },
  {
    label: "TypeScript",
    img: {
      light: typescript,
      dark: typescriptDark,
    },
    url: "https://www.typescriptlang.org/",
  },
  {
    label: "TailwindCSS",
    img: {
      light: tailwindcss,
      dark: tailwindcssDark,
    },
    url: "https://tailwindcss.com/",
  },
  {
    label: "React",
    img: {
      light: react,
      dark: reactDark,
    },
    url: "https://reactjs.org/",
  },
  {
    label: "Vite",
    img: {
      light: vite,
      dark: viteDark,
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
                    alt={label}
                    loading="lazy"
                    placeholder="blur"
                    fill
                    className="light-mode-image"
                  />
                  <Image
                    src={img.dark}
                    alt={label}
                    loading="lazy"
                    placeholder="blur"
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
