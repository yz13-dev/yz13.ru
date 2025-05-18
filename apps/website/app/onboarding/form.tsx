"use client";
import AvatarHandler from "@/components/avatar-handler";
import { useDebounceEffect } from "ahooks";
import { Loader2Icon } from "lucide-react";
import { Input } from "mono/components/input";
import { Select, SelectTrigger, SelectValue } from "mono/components/select";
import { Separator } from "mono/components/separator";
import { useEffect, useState } from "react";
import { UserObject } from "rest-api/types/user";
import { updateUser } from "rest-api/user";
import { useUserStore } from "../account/settings/user.store";
import Google from "./extensions/google";

export default function ({ defaultUser }: { defaultUser?: UserObject }) {
  const user = useUserStore((state) => state.user);
  const refreshUser = useUserStore((state) => state.refreshUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>(defaultUser?.username ?? "");
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
  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);
  return (
    <>
      {loading && (
        <div className="absolute backdrop-blur-md gap-2 z-10 top-0 left-0 w-full h-full flex items-center justify-center">
          <Loader2Icon size={16} className="animate-spin" />
          <span className="text-sm text-muted-foreground">
            Загрузка данных...
          </span>
        </div>
      )}
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
