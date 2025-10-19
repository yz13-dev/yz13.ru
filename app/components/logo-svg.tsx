import { cn } from "@yz13/ui/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;
export default function ({ className, ...props }: Props) {
  return (
    <svg
      width="100%"
      height="100%"
      className={cn("[&>*]:fill-foreground", className)}
      viewBox="0 0 239 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 5H0V45H5L4.99989 50H10V45H5V5H10V0H5V5Z" fill="var(--foreground)" />
      <path d="M35.2 34.8214V49.9998H40.8V34.8214H35.2Z" fill="var(--foreground)" />
      <path d="M52 26.7857V31.25H56.6667V26.7858L52 26.7857Z" fill="var(--foreground)" />
      <path d="M56.6667 31.25V35.7143H61.3333V31.25H56.6667Z" fill="var(--foreground)" />
      <path d="M24 26.7858L19.3333 26.7857V31.25H24V26.7858Z" fill="var(--foreground)" />
      <path d="M19.3333 31.25H14.6667V35.7143H19.3333V31.25Z" fill="var(--foreground)" />
      <path d="M22.1333 6.25V10.7143H26.8V6.25H22.1333Z" fill="var(--foreground)" />
      <path d="M17.4667 6.25H22.1333V1.78571H17.4667V6.25Z" fill="var(--foreground)" />
      <path d="M53.8667 6.25H49.2V10.7143H53.8667V6.25Z" fill="var(--foreground)" />
      <path d="M53.8667 1.78571V6.25H58.5333V1.78571H53.8667Z" fill="var(--foreground)" />
      <path d="M47.3333 33.0357V37.5H52V33.0357H47.3333Z" fill="var(--foreground)" />
      <path d="M28.6667 33.0357H24V37.5H28.6667V33.0357Z" fill="var(--foreground)" />
      <path d="M35.2 4.46429V10.7143H31.4667V15.1786H19.3333V19.6429H24V24.1071L28.6667 24.1071V33.0357H33.3333V28.5714H42.6667V33.0357H47.3333V24.1071H52L52 19.6429H56.6666L56.6666 15.1786H44.5332L44.533 10.7143H40.8058C40.8058 9.08642 40.8 4.46429 40.8 4.46429H35.2Z" fill="var(--foreground)" />
      <path d="M71 5H76V45H71L71.0001 50H66V45H71V5H66V0H71V5Z" fill="var(--foreground)" />
      <path d="M92 16.5V29H96H100V33V37H108.5H117V45.5V54H108.5H100V58V62H108.5H117V58V54H121H125V29V4H121H117V16.5V29H108.5H100V16.5V4H96H92V16.5Z" fill="var(--foreground)" />
      <path d="M144 21V29H135V46H169V37H144V29H160V21H144Z" fill="var(--foreground)" />
      <path d="M160 21L169 21V4L135 4L135 13L160 13V21Z" fill="var(--foreground)" />
      <path d="M188 12H179V16L179 20H188V45H196V4H188V12Z" fill="var(--foreground)" />
      <path d="M206 4V12H231V20H214V29H231V37H206V45H231V37H239V29H231V24.5V20H239V12H231V4H206Z" fill="var(--foreground)" />
    </svg>
  )
}
