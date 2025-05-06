"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "yz13/supabase/client";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldInput,
  FieldLabel,
} from "../field";
import { useUserStore } from "../user.store";

const UsernameField = () => {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValue = user?.username ?? "";
  const [username, setUsername] = useState(initialValue);
  const supabase = createClient();
  const router = useRouter();
  const handleUsername = async (username: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { username },
      });
      if (error) throw error;
      if (data) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Field>
      <div className="space-y-0 *:block">
        <FieldLabel>Никнейм</FieldLabel>
        <FieldDescription>
          Никнейм будет отображаться в списке пользователей и в ссылках на
          профиль и комментарии
        </FieldDescription>
      </div>
      <FieldContent>
        <FieldInput
          placeholder="YZ13"
          value={username}
          onValueChange={(value) => setUsername(value)}
        />
      </FieldContent>
    </Field>
  );
};

export default UsernameField;
