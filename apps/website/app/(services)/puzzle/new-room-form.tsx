"use client";
import { createRoom } from "rest-api/rooms";
import { useUser } from "@/lib/use-auth";
import { Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Label } from "mono/components/label";
import { Switch } from "mono/components/switch";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const NewRoomForm = ({ prefix = "room" }: { prefix?: string }) => {
  const [user] = useUser();
  const [name, setName] = useState("");
  const [publicRoom, setPublicRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const disabled = useMemo(
    () => name.length <= 2 || loading || !user,
    [name, loading, user],
  );
  const router = useRouter();
  const handleCreate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const result = await createRoom({
        name,
        public: publicRoom,
        owner: user.id,
      });
      if (result) {
        const cutPrefix = (str: string) => {
          const withOutSlashOnStartAndEnd = str.replace(/^\/|\/$/g, "");
          return withOutSlashOnStartAndEnd;
        };
        const isPrefixEndWithSlash = prefix.endsWith("/");
        const isPrefixStartWithSlash = prefix.startsWith("/");
        const path =
          isPrefixEndWithSlash && isPrefixStartWithSlash
            ? cutPrefix(prefix)
            : `/${prefix}/`;
        const pathname = `/${path}/${result.id}`;
        router.push(pathname);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Название комнаты"
          className="h-10 text-base"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          disabled={disabled}
          className="gap-2"
          variant="secondary"
          onClick={handleCreate}
        >
          {loading && <Loader2Icon size={16} className="animate-spin" />}{" "}
          Создать
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        <Switch
          id="public-room"
          checked={publicRoom}
          onCheckedChange={setPublicRoom}
        />
        <Label htmlFor="public-room" className="text-sm text-secondary">
          Публичная комната
        </Label>
      </div>
    </div>
  );
};

export default NewRoomForm;
