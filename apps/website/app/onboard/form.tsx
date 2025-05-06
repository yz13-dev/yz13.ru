"use client";
import AvatarHandler from "@/components/avatar-handler";
import { useDebounceEffect } from "ahooks";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateUser } from "rest-api/user";
import { useUserStore } from "../account/settings/user.store";

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
      setUsernameLoading(false);
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
  useDebounceEffect(
    () => {
      if (user?.username !== username) {
        setUsernameLoading(true);
        updateUsername(username);
      }
    },
    [user, username],
    { wait: 1000 },
  );
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);
  return (
    <>
      <div className="w-full h-fit space-y-6">
        <div className="*:block space-y-0">
          <span className="text-lg font-medium">
            Кастомизируйте свой профиль
          </span>
          <span className="text-sm text-muted-foreground">
            Выберите вашу профессию и укажите свой никнейм
          </span>
        </div>
        <Input
          disabled={usernameLoading}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите ваш никнейм"
        />
        {/* <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите вашу профессию" />
          </SelectTrigger>
        </Select> */}
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
    </>
  );
}
