import { ThemeImage } from "@/components/theme-image";
import { Project } from "@yz13/registries/projects";
import { cn } from "@yz13/ui/cn";
import Image from "next/image";


export default function LogoGrid({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full container px-6 mx-auto h-fit md:pt-32 pt-24 md:pb-16 pb-12 gap-12 grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
      {children}
    </div>
  )
}

export const LogoGridItem = ({
  logo,
  className = ""
}: {
  className?: string
  logo: Project["logo"]
}) => {

  if (!logo) return null;
  if (logo.url) return (
    <div
      className={cn(
        "size-32 p-3 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card flex items-center justify-center",
        className
      )}
    >
      <Image
        className="relative size-full"
        src={logo.url || "/logo/dark.png"}
        width={96}
        height={96}
        alt="logo"
      />
    </div>
  )
  return (
    <div
      className={cn(
        "size-32 p-3 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card flex items-center justify-center",
        className
      )}
    >
      <ThemeImage
        className="relative w-full"
        srcDark={logo.theme?.dark || "/logo/dark.png"}
        srcLight={logo.theme?.light || "/logo/light.png"}
        width={96}
        height={96}
        alt="logo"
      />
    </div>
  )
}
