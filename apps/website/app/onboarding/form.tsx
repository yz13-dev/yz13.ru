"use client";
import AvatarHandler from "@/components/avatar-handler";
import { patchV1UserUid } from "@yz13/api";
import { GetV1PositionsLangPositionId200, GetV1UserUid200 } from "@yz13/api/types";
import { Input } from "@yz13/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@yz13/ui/components/select";
import { Separator } from "@yz13/ui/components/separator";
import { useDebounceEffect } from "ahooks";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserStore } from "../account/settings/user.store";
import Google from "./extensions/google";
import Zoom from "./extensions/zoom";

type Position = GetV1PositionsLangPositionId200;

export default function ({
  defaultUser,
  positions = [],
}: {
  defaultUser?: GetV1UserUid200;
  positions?: Position[];
}) {
  const user = useUserStore((state) => state.user);
  const refreshUser = useUserStore((state) => state.refreshUser);
  const defaultPosition = positions.find((p) => p.id === defaultUser?.position);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>(defaultUser?.username ?? "");
  const [position, setPosition] = useState<Position | null>(
    defaultPosition ?? null,
  );
  const [usernameLoading, setUsernameLoading] = useState<boolean>(false);
  const [positionLoading, setPositionLoading] = useState<boolean>(false);
  const updateUsername = async (username: string) => {
    const uid = user?.id;
    if (!uid) return;
    try {
      await patchV1UserUid(uid, {
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
  const updatePosition = async (position: Position) => {
    const uid = user?.id;
    if (!uid) return;
    try {
      await patchV1UserUid(uid, {
        data: {
          position: position.id,
        },
      });
      refreshUser();
    } catch (error) {
      console.log(error);
    } finally {
      setPositionLoading(false);
    }
  };

  const getIdentity = (provider: string): any => {
    return (user?.identities ?? [])?.find((i: any) => i.provider === provider);
  }

  const googleIdentity = getIdentity("google")
  const zoomIdentity = getIdentity("zoom")

  const gooleLinked = !!googleIdentity
  const zoomLinked = !!zoomIdentity

  console.log(user);

  useEffect(() => {
    if (defaultUser) {
      if (defaultUser.username) setUsername(defaultUser.username);
      const defaultPosition = positions.find((p) => p.id === defaultUser?.position);
      if (defaultPosition) setPosition(defaultPosition ?? null);
    }
  }, [defaultUser, positions])
  useDebounceEffect(
    () => {
      if (position && user?.position !== position?.id) {
        setPositionLoading(true);
        updatePosition(position);
      }
    },
    [user, position],
    { wait: 1000 },
  );
  useDebounceEffect(
    () => {
      if (username && username.length >= 4 && user?.username !== username) {
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
        <Select
          value={position?.id}
          onValueChange={(value) => {
            const newPosition = positions.find((p) => p.id === value);
            setPosition(newPosition ?? null);
          }}
        >
          <SelectTrigger className="w-full" disabled={positionLoading}>
            <SelectValue placeholder="Выберите вашу профессию" />
          </SelectTrigger>
          <SelectContent>
            {positions.map((position) => (
              <SelectItem key={position.id} value={position.id}>
                {position.label}
              </SelectItem>
            ))}
          </SelectContent>
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
          {
            false &&
            <li>
              <Google linked={!!gooleLinked} identity={googleIdentity} />
            </li>
          }
          <li>
            <Zoom linked={!!zoomLinked} identity={zoomIdentity} />
          </li>
        </ul>
      </div>
    </>
  );
}
