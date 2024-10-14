import { cn } from "@/helpers/cn"
import "./image.css"
type DynamicImageProps = {
  image: {
    dark: string
    light: string
  }
  alt?: string
  className?: string
}
const DynamicImage = async ({ image, alt = "", className }: DynamicImageProps): Promise<JSX.Element> => {
  const { dark, light } = image
  return (
    <>
      <img
        src={dark}
        className={cn("dark-mode-image", className)}
        alt={alt || "dark-img"}
      />
      <img
        src={light}
        className={cn("light-mode-image", className)}
        alt={alt || "light-img"}
      />
    </>
  )
}
export { DynamicImage, type DynamicImageProps }
