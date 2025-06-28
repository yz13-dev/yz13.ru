"use client";
import { useUserStore } from "@/app/account/settings/user.store";
import { isDev } from "@/app/login/get-url";
import { createClient } from "@yz13/supabase/client";
import { Button } from "@yz13/ui/components/button";
import { CheckIcon, Loader2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { PiGoogleLogo } from "react-icons/pi";

type UserIdentity = any;

export default function ({ linked = false, identity }: { linked?: boolean, identity?: UserIdentity }) {
  const [loading, setLoading] = useState<boolean>(false);
  const refreshUser = useUserStore((state) => state.refreshUser);
  const unlink = async () => {
    if (!identity) return;
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
      const supabase = createClient();
      const { data, error } = await supabase.auth.linkIdentity({
        provider: "google",
        options: {
          redirectTo: backLink,
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
          <PiGoogleLogo size={16} />
        )}
        Google
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
