"use client";

import { cn } from "@yz13/ui/cn";
import {
  ArrowRightIcon,
  CheckIcon,
  Loader2Icon,
  PlusIcon,
  XIcon,
} from "@yz13/ui/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@yz13/ui/input-group";
import { toast } from "@yz13/ui/sonner";
import { useDebounceEffect } from "ahooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { checkLink } from "../utils/link";

const URL =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  "yz13.link";

type Props = ComponentProps<"div"> & {
  defaultUsername?: string;
};
export default function ({ defaultUsername, className = "", ...props }: Props) {
  const [exist, setExist] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(defaultUsername || "");

  const router = useRouter();

  const check = async (username: string) => {
    setLoading(true);
    try {
      const exist = await checkLink(username);
      setExist(exist);

      if (exist === true)
        toast.error("Пользователь с таким именем уже существует");
      if (exist === false) toast.success("Имя пользователя свободно");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useDebounceEffect(
    () => {
      if (username) check(username);
      else setExist(null);
    },
    [username],
    { wait: 500 },
  );
  return (
    <InputGroup
      className={cn("h-10 shadow-none bg-card", className)}
      {...props}
    >
      <InputGroupInput
        placeholder="username"
        className="!text-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          const key = e.key;
          if (key === "Enter") router.push(`/new?username=${username}`);
        }}
      />
      {typeof exist === "boolean" && (
        <InputGroupAddon align="inline-start">
          {!loading && exist === true && <XIcon />}
          {!loading && exist === false && <CheckIcon />}
          {loading && <Loader2Icon className="animate-spin" />}
        </InputGroupAddon>
      )}
      <InputGroupAddon align="inline-start">
        <InputGroupText className="text-lg">{URL}/</InputGroupText>
      </InputGroupAddon>
      {!loading && exist === true && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton asChild variant="default">
            <Link href={`/${username}`}>
              <span>Перейти</span>
              <ArrowRightIcon />
            </Link>
          </InputGroupButton>
        </InputGroupAddon>
      )}
      {!loading && exist === false && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton asChild variant="default">
            <Link href={`/new?username=${username}`}>
              <span>Создать</span>
              <PlusIcon />
            </Link>
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
