"use client";
import { isDev } from "@/app/login/get-url";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { useState } from "react";
import { PiGoogleLogo } from "react-icons/pi";
import { createClient } from "yz13/supabase/client";

export default function ({ linked = false }: { linked?: boolean }) {
  const [loading, setLoading] = useState<boolean>(false);
  const linkGoogle = async () => {
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
    <Button variant="ghost" disabled={linked ?? loading} onClick={linkGoogle}>
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
  );
}
