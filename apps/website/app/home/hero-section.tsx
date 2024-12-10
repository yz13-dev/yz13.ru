"use client"
import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon"
import { NextIcon } from "@/components/pixel-stack/next-icon"
import { NodeIcon } from "@/components/pixel-stack/node-icon"
import { ReactIcon } from "@/components/pixel-stack/react-icon"
import { SupabaseIcon } from "@/components/pixel-stack/supabase-icon"
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon"
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon"
import { ZodIcon } from "@/components/pixel-stack/zod"
import { Skill } from "@/components/skill-label"
import { cn } from "yz13/cn"
import { create } from "zustand"


const HeroSection = () => {
  return (
    <section className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-y-12 lg:p-12 p-6">
      <div className="space-y-3">
        <h1 className="lg:!text-9xl text-7xl text-center font-semibold">YZ13</h1>
        <p className="lg:!text-3xl text-xl text-center text-secondary">
          Just fullstack developer, nothing crazy.
        </p>
      </div>

      <SkillSection />
    </section>
  )
}

const skills = [
  {
    name: "React",
    current: 4,
    max: 5,
    id: "react",
  },
  {
    name: "Typescript",
    current: 3,
    max: 5,
    id: "typescript",
  },
  {
    name: "NextJS",
    current: 4,
    max: 5,
    id: "nextjs",
  },
  {
    name: "TailwindCSS",
    current: 4,
    max: 5,
    id: "tailwindcss",
  },
  {
    name: "Zod",
    current: 2,
    max: 5,
    id: "zod",
  },
  {
    name: "NodeJS",
    current: 3,
    max: 5,
    id: "nodejs",
  },
  {
    name: "Supabase",
    current: 1,
    max: 5,
    id: "supabase",
  }
]

type Action = {
  setActive: (id: string | null) => void
}
type State = {
  active: string | null
}
const useSkillStore = create<State & Action>()((set) => ({
  active: null,
  setActive: (id: string | null) => {
    set({ active: id })
  }
}))

const SkillSection = () => {
  const { active, setActive } = useSkillStore()
  return (
    <ul className="max-w-md inline-flex items-center justify-center w-full gap-1 flex-wrap">
      {skills.map((skill) => (
        <li key={skill.id}>
          <Skill
            className={cn(
              "relative",
              active === skill.id
                ? "border-foreground"
                : ""
            )}
            onMouseEnter={() => setActive(skill.id)}
            onMouseLeave={() => setActive(null)}
          >
            <Skill.Label>
              {skill.name}
            </Skill.Label>
            <Skill.Scale current={skill.current} max={skill.max} />
          </Skill>
        </li>
      ))}
    </ul>
  )
}

const HeroBackground = () => {
  const { active } = useSkillStore()
  return (
    <div className="absolute -z-10 lg:-bottom-32 -bottom-48 min-w-[1440] w-full lg:!px-32 md:px-20 px-12 flex items-center justify-between">
      <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-6">
        <div className={cn(
          "w-36 aspect-square rounded-3xl transition-colors border",
          active === "react" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <ReactIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "react" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
        <div className={cn(
          "w-36 aspect-square rounded-3xl row-start-2 col-start-2 transition-colors border",
          active === "nextjs" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <NextIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "nextjs" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
        <div className={cn(
          "w-36 aspect-square rounded-3xl row-start-3 col-start-1 transition-colors border",
          active === "typescript" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <TypeScriptIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "typescript" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
        <div className={cn(
          "w-36 aspect-square rounded-3xl row-start-3 col-start-3 transition-colors border",
          active === "tailwindcss" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <TailwindIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "tailwindcss" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
      </div>
      <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-6">
        <div className={cn(
          "w-36 aspect-square rounded-3xl col-start-3 transition-colors border",
          active === "nodejs" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <NodeIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "nodejs" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
        <div className={cn(
          "w-36 aspect-square rounded-3xl row-start-2 col-start-2 transition-colors border",
          active === "zod" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <ZodIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "zod" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
        <div className={cn(
          "w-36 aspect-square rounded-3xl row-start-3 col-start-1 transition-colors border",
          active === "supabase" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <SupabaseIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "supabase" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
        <div className={cn(
          "w-36 aspect-square rounded-3xl row-start-3 col-start-3 transition-colors border",
          active === "mongodb" ? "border-foreground" : "",
          "flex items-center justify-center"
        )}
        >
          <MongoDBIcon
            // @ts-expect-error
            style={{ "--icon-brand-color": active === "mongodb" ? "var(--yz13-foreground)" : "var(--yz13-border)" }}
            className="size-16"
          />
        </div>
      </div>
    </div>
  )
}

export { HeroBackground }
export default HeroSection