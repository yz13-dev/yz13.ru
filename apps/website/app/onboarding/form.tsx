"use client";
import AvatarHandler from "@/components/avatar-handler";
import { useDebounceEffect } from "ahooks";
import { Loader2Icon } from "lucide-react";
import { Input } from "mono/components/input";
import { Select, SelectTrigger, SelectValue } from "mono/components/select";
import { Separator } from "mono/components/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUser } from "rest-api/user";
import { useUserStore } from "../account/settings/user.store";
import Google from "./extensions/google";

export default function () {
  const user = useUserStore((state) => state.user);
  const refreshUser = useUserStore((state) => state.refreshUser);
  const router = useRouter();
  const [username, setUsername] = useState<string>(user?.username ?? "");
  const [usernameLoading, setUsernameLoading] = useState<boolean>(false);
  const updateUsername = async (username: string) => {
    const uid = user?.id;
    if (!uid) return;
    try {
      await updateUser(uid, {
        data: {
          username,
        },
      });
      refreshUser();
    } catch (error) {
      console.log(error);
    } finally {
      setUsernameLoading(false);
    }
  };
  const gooleLinked = user?.identities?.find((i) => i.provider === "google");
  useDebounceEffect(
    () => {
      if (username.length >= 4 && user?.username !== username) {
        setUsernameLoading(true);
        updateUsername(username);
      }
    },
    [user, username],
    { wait: 1000 },
  );
  useDebounceEffect(
    () => {
      console.log(user);
      if (!user) router.push("/login");
      else {
        if (user.username) setUsername(user.username);
      }
    },
    [user],
    { wait: 1000 },
  );
  return (
    <>
      <div className="w-full h-fit space-y-6">
        <div className="*:block space-y-0">
          <span className="text-lg font-medium">
            Кастомизируйте свой профиль
          </span>
          <span className="text-sm text-muted-foreground">
            При редактировании, изменения вступят в силу сразу.
          </span>
        </div>
        <div className="space-y-2">
          <span className="text-sm block text-muted-foreground">
            Выберите вашу профессию и укажите свой никнейм
          </span>
          <div className="relative w-full flex items-center">
            <Input
              disabled={usernameLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите ваш никнейм"
            />
            {usernameLoading && (
              <Loader2Icon
                className="absolute right-2 animate-spin"
                size={18}
              />
            )}
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите вашу профессию" />
          </SelectTrigger>
        </Select>
      </div>
      <Separator />
      <div className="w-full h-fit space-y-6">
        <div className="*:block space-y-0">
          <span className="text-base font-medium">
            Загрузите аватар, если хотите
          </span>
          <span className="text-sm text-muted-foreground">
            Нужна картинка, 128x128px
          </span>
        </div>
        <div className="flex items-center gap-4">
          <AvatarHandler />
        </div>
      </div>
      <Separator />
      <div className="w-full h-fit space-y-6">
        <div className="*:block space-y-0">
          <span className="text-base font-medium">
            Подключите социальные сети
          </span>
          <span className="text-sm text-muted-foreground">
            После подключения будут отображены в профиле
          </span>
        </div>
        <ul className="space-y-3">
          <li>
            <Google linked={!!gooleLinked} />
          </li>
        </ul>
      </div>
    </>
  );
}
