import Image, { StaticImageData } from "next/image";
import css from "public/tech/CSS3.png";
import html from "public/tech/HTML5.png";
import nextjs from "public/tech/nextjs.png";
import nodejs from "public/tech/nodejs.png";
import postgresSQL from "public/tech/postgresSQL.png";
import react from "public/tech/react.png";
import redis from "public/tech/redis.png";
import tailwindcss from "public/tech/tailwindcss.png";
import typescript from "public/tech/typescript.png";
import vite from "public/tech/vite.png";
import { cn } from "yz13/cn";

type TechItem = {
  label: string;
  img: StaticImageData;
  url: string;
};

const list: TechItem[] = [
  {
    label: "NextJS",
    img: nextjs,
    url: "https://nextjs.org/",
  },
  {
    label: "TypeScript",
    img: typescript,
    url: "https://www.typescriptlang.org/",
  },
  {
    label: "Redis",
    img: redis,
    url: "/",
  },
  {
    label: "PostgresSQL",
    img: postgresSQL,
    url: "/",
  },
  // {
  //   label: "MongoDB",
  //   img: mongoDB,
  //   url: "/",
  // },
  {
    label: "NodeJS",
    img: nodejs,
    url: "/",
  },
  {
    label: "HTML",
    img: html,
    url: "/",
  },
  {
    label: "CSS",
    img: css,
    url: "/",
  },
  {
    label: "TailwindCSS",
    img: tailwindcss,
    url: "https://tailwindcss.com/",
  },
  {
    label: "React",
    img: react,
    url: "https://reactjs.org/",
  },
  {
    label: "Vite",
    img: vite,
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
                items.map(({ label, img }) => {
                  return (
                    <div
                      key={key + "/" + label}
                      className="flex flex-col gap-2 items-center"
                    >
                      <div className="relative size-16 p-2 bg-background border rounded-lg flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={img}
                            alt={label}
                            loading="lazy"
                            placeholder="blur"
                            fill
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
