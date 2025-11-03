import { cn } from "@yz13/ui/cn";
import Image, { ImageProps } from "next/image";

export type ThemeImageProps = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export const ThemeImage = (props: ThemeImageProps) => {
  const { srcLight, srcDark, className = "", ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className={cn("imgLight", className)} />
      <Image {...rest} src={srcDark} className={cn("imgDark", className)} />
    </>
  );
};
