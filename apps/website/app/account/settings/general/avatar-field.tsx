"use client";
import { patchV1UserUid } from "@yz13/api";
import { avatarURL } from "@yz13/api/lib/avatar-url";
import { createClient } from "@yz13/supabase/client";
import { cn } from "@yz13/ui/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/components/avatar";
import { Button, buttonVariants } from "@yz13/ui/components/button";
import { Input } from "@yz13/ui/components/input";
import { Label } from "@yz13/ui/components/label";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../field";
import { useUserStore } from "../user.store";

export default function AvatarField() {
  const user = useUserStore((state) => state.user);
  const refreshUser = useUserStore((state) => state.refreshUser);
  const avatar_url = user?.avatar_url ?? null;
  const username = user?.username ?? "Username";
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleAvatarChange = async (url: string | null) => {
    const uid = user?.id;
    if (!uid) return;
    const updated = await patchV1UserUid(uid, {
      data: {
        avatar_url: url,
      },
    });
    console.log(updated);
    setLoading(false);
    refreshUser();
  };
  const handleDeleteAvatar = async () => {
    const uid = user?.id;
    if (!uid) return;
    setLoading(true);
    await removeOldAvatar();
    handleAvatarChange(null);
  };
  const getAvavarName = (file: File) => {
    const name = file.name;
    const ext = name.split(".").pop();
    return `avatar.${ext}`;
  };
  const removeOldAvatar = async () => {
    const uid = user?.id;
    if (!uid) return;
    if (!avatar_url) return;
    const supabase = createClient();
    const storage = supabase.storage;
    await storage.from("avatar").remove([avatar_url]);
  };
  const uploadAvatar = async (file: File) => {
    const uid = user?.id;
    if (!uid) return;
    const supabase = createClient();
    const storage = supabase.storage;
    const avatarName = getAvavarName(file);
    const path = `${uid}/${avatarName}`;
    const { data, error } = await storage.from("avatar").upload(path, file);
    const avatarPath = data?.path;
    return avatarPath;
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setLoading(true);
        const hasAvatar = avatar_url !== null;
        if (hasAvatar) removeOldAvatar();
        uploadAvatar(file).then((avatar_url) => {
          if (avatar_url) {
            handleAvatarChange(avatar_url);
          }
        });
      }
    }
  };
  return (
    <Field>
      <div className="space-y-0 *:block">
        <FieldLabel>Аватар</FieldLabel>
        <FieldDescription>
          Отображается в списке пользователей и в ссылках на профиль и
          комментариях.
        </FieldDescription>
      </div>
      <FieldContent className="justify-start">
        <Avatar className="size-16">
          <AvatarImage src={avatar_url ? avatarURL(avatar_url) : undefined} />
          <AvatarFallback className="text-2xl">
            {username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <Label
          htmlFor="file-upload"
          aria-disabled={loading}
          className={cn(
            "aria-disabled:text-muted-foreground",
            buttonVariants({ variant: "secondary" }),
          )}
        >
          Загрузить
        </Label>
        <Input
          disabled={loading}
          accept="image/*"
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={handleFileChange}
        />
        <>
          {!!avatar_url && (
            <Button
              disabled={loading}
              size="icon"
              variant="ghost"
              onClick={handleDeleteAvatar}
            >
              <XIcon size={16} />
            </Button>
          )}
        </>
      </FieldContent>
    </Field>
  );
}
