import Image, { StaticImageData } from "next/image";
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
import { cn } from "yz13/cn";

type TechItem = {
  label: string;
  img: {
    light: StaticImageData;
    dark: StaticImageData;
  };
  url: string;
};

const list: TechItem[] = [
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

const gropupByFirstLetter = (list: TechItem[]) => {
  const result: Record<string, typeof list> = {};
  list.forEach((item) => {
    const firstLetter = item.label.charAt(0).toUpperCase();
    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }
    result[firstLetter].push(item);
  });
  return result;
};

const TechList = ({ className = "" }: { className?: string }) => {
  const groups = gropupByFirstLetter(list);
  const keys = Object.keys(groups).sort();
  return (
    <ul
      className={cn(
        "w-full space-y-6 grid lg:!grid-cols-3 md:!grid-cols-2 grid-cols-1",
        className,
      )}
    >
      {keys.map((key) => {
        const items = groups[key];
        return (
          <li className="flex flex-col gap-3 w-full" key={key}>
            <span className="text-base font-medium">{key} </span>
            <div className="flex flex-row gap-4 flex-wrap items-start">
              {items &&
                items.map(({ label, img, url }) => {
                  return (
                    <div
                      key={key + "/" + label}
                      className="flex flex-col gap-2 items-center"
                    >
                      <div className="relative size-16 p-2 bg-background border rounded-lg flex items-center justify-center">
                        <div className="relative w-full h-full">
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
                        </div>
                      </div>
                      <div className="w-full text-center text-sm">{label}</div>
                    </div>
                  );
                })}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TechList;
