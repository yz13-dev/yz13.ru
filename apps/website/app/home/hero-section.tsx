import { Skill } from "@/components/skill-label"


const HeroSection = () => {
  return (
    <section className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-y-12 lg:p-12 p-6">
      <div className="space-y-3">
        <h1 className="lg:!text-9xl text-7xl text-center font-semibold">YZ13</h1>
        <p className="lg:!text-3xl text-xl text-center text-secondary">
          Just fullstack developer, nothing crazy.
        </p>
      </div>
      <ul className="max-w-screen-md inline-flex items-center justify-center w-full gap-1 flex-wrap">
        <li><Skill><Skill.Label>React</Skill.Label><Skill.Scale current={4} max={5} /></Skill></li>
        <li><Skill><Skill.Label>Typescript</Skill.Label><Skill.Scale current={3} max={5} /></Skill></li>
        <li><Skill><Skill.Label>NextJS</Skill.Label><Skill.Scale current={4} max={5} /></Skill></li>
        <li><Skill><Skill.Label>Vite</Skill.Label><Skill.Scale current={2} max={5} /></Skill></li>
        <li><Skill><Skill.Label>TailwindCSS</Skill.Label><Skill.Scale current={4} max={5} /></Skill></li>
        <li><Skill><Skill.Label>Zod</Skill.Label><Skill.Scale current={2} max={5} /></Skill></li>
        <li><Skill><Skill.Label>NodeJS</Skill.Label><Skill.Scale current={3} max={5} /></Skill></li>
        <li><Skill><Skill.Label>Typescript</Skill.Label><Skill.Scale current={3} max={5} /></Skill></li>
        <li><Skill><Skill.Label>PostgresQL</Skill.Label><Skill.Scale current={1} max={5} /></Skill></li>
        <li><Skill><Skill.Label>MongoDB</Skill.Label><Skill.Scale current={1} max={5} /></Skill></li>
      </ul>
    </section>
  )
}

export default HeroSection