"use client";
import { useUserStore } from "@/app/account/settings/user.store";
import { isDev } from "@/app/login/get-url";
import type { UserIdentity } from "@yz13/api/types/user";
import { createClient } from "@yz13/supabase/client";
import { Button } from "@yz13/ui/components/button";
import { CheckIcon, Loader2Icon, StoreIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function ({ linked = false, identity }: { linked?: boolean, identity?: UserIdentity }) {
  const [loading, setLoading] = useState<boolean>(false);
  const refreshUser = useUserStore((state) => state.refreshUser);
  const unlink = async () => {
    if (!identity) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.unlinkIdentity(identity);
      console.log(data, error);
      if (data) refreshUser()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const link = async () => {
    try {
      const backLink = isDev ? "https://localhost:3001" : "https://yz13.ru";
      const url = new URL(backLink);
      const searchParams = url.searchParams;
      searchParams.set("app", "zoom");
      const supabase = createClient();
      const { data, error } = await supabase.auth.linkIdentity({
        provider: "zoom",
        options: {
          redirectTo: url.toString(),
          scopes: undefined,
        },
      });
      console.log(data, error);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" disabled={linked ?? loading} onClick={link}>
        {linked ? (
          <CheckIcon size={16} />
        ) : loading ? (
          <Loader2Icon className="animate-spin" size={16} />
        ) : (
          <StoreIcon size={16} />
        )}
        Zoom
        {linked && " связан"}
      </Button>
      {
        identity &&
        <Button
          size="sm"
          variant="destructive" disabled={loading || !linked || !identity} onClick={unlink}>
          <XIcon size={16} />
        </Button>
      }
    </div>
  );
}
