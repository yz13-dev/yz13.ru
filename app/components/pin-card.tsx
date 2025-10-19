"use client";
import type { Pin } from "@/app/hooks/use-grid";
import { randomFloat } from "@/app/utils/random";
import type { GetPinsV1PinsPinId200 } from "@yz13/api/types";
import { TypingText } from "@yz13/ui/animated/typing";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { Button } from "@yz13/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/ui/dropdown-menu";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { BanIcon, DownloadIcon, EllipsisIcon, EyeClosedIcon, EyeIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo } from "react";
import PinImage from "./pin-image";
import PinVideo from "./pin-video";

export type Profile = NonNullable<GetPinsV1PinsPinId200>["owner"];

export const PinAuthorSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-6 rounded-full" />
      <Skeleton className="h-4 w-14" />
    </div>
  )
}

export const PinAuthor = ({
  author,
  size = "md"
}: {
  size?: "sm" | "md" | "lg"
  author: Profile
}) => {

  const username = (author?.username ?? "")
  const usernameFallback = (author?.username ?? "").slice(0, 2)

  const avatarUrl = author?.avatar_url ?? undefined;
  const randomWait = useMemo(() => randomFloat(0, 10), []);


  return (
    <div className={cn(
      "flex items-center gap-2",
      size === "sm" && "gap-1",
      size === "md" && "gap-2",
      size === "lg" && "gap-3",
    )}>
      <Avatar className={cn(
        size === "sm" && "size-6",
        size === "md" && "size-8",
        size === "lg" && "size-10",
      )}>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{usernameFallback}</AvatarFallback>
      </Avatar>
      <TypingText
        delay={randomWait}
        text={username}
        className={cn(
          "font-medium",
          size === "sm" && "text-sm",
          size === "md" && "text-lg",
          size === "lg" && "text-xl",
        )}
      />
    </div>
  )
}

export const PinDropdown = ({
  pin,
  boardId,
  children
}: {
  pin: Pin,
  boardId?: string,
  children?: React.ReactNode
}) => {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!!children}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          !boardId &&
          <>
            <DropdownMenuItem>
              <EyeIcon />
              <span>Больше похожих</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EyeClosedIcon />
              <span>Меньше похожих</span>
            </DropdownMenuItem>
          </>
        }
        <DropdownMenuItem>
          <DownloadIcon />
          <span>Скачать пин</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BanIcon />
          <span>Пожаловаться на пин</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function ({ pin, className = "", boardId }: { pin: Pin, className?: string, boardId?: string }) {

  const width = pin.width;
  const height = pin.height;

  const isVideo = pin.attachment?.endsWith(".mp4") ?? false;

  const aspectRatio = useMemo(() => width && height ? width / height : 1, [width, height]);

  const url = `https://pins.yz13.ru/pin/${pin.id}`

  if (!pin.attachment) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "w-full relative space-y-2 group",
        "outline-0",
        className
      )}
      transition={{ duration: .7, type: "spring" }}
    >
      <div
        style={{
          aspectRatio
        }}
        className={cn(
          "w-full relative rounded-sm transition-all outline-foreground/50",
          "group-hover:outline-offset-2 group-hover:outline-4",
          "focus-visible:outline-offset-2 focus-visible:outline-4",
          "focus-within:outline-offset-2 focus-within:outline-4",
        )}>
        {
          isVideo
            ? <PinVideo
              width={width ?? undefined}
              height={height ?? undefined}
              src={pin.attachment}
            />
            : <PinImage
              blurDataURL={pin.thumbnail || true}
              width={width ?? undefined}
              height={height ?? undefined}
              src={pin.attachment}
              alt={pin.name}
            />
        }
        <Link href={url} className="absolute inset-0 size-full outline-0" />
      </div>
      <div className="w-full flex items-center justify-between">
        <PinAuthor author={pin.owner} size="sm" />
        <PinDropdown pin={pin} boardId={boardId}>
          <Button className="p-1 size-6" variant="ghost"><EllipsisIcon /></Button>
        </PinDropdown>
      </div>
    </motion.div>
  )
}

export const PinCardSkeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className="w-full relative space-y-2 group">
      <Skeleton className={cn("w-full aspect-square", className)} />
      <div className="w-full flex items-center justify-between">
        <PinAuthorSkeleton />
        <Button className="p-1 size-6" variant="ghost"><EllipsisIcon /></Button>
      </div>
    </div>
  )
}
