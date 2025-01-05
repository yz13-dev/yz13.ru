"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "yz13/supabase/client";
import {
  Field,
  FieldContent,
  FieldInput,
  FieldLabel,
  FieldTrigger,
} from "../field";
import { useUser } from "../user.store";

const UsernameField = () => {
  const user = useUser((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValue = user?.user_metadata?.username ?? "";
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
      <FieldLabel>Username</FieldLabel>
      <FieldContent>
        <FieldInput
          placeholder="YZ13"
          value={username}
          onValueChange={(value) => setUsername(value)}
        />
        <FieldTrigger
          loading={loading}
          onAction={() => handleUsername(username)}
        >
          Edit
        </FieldTrigger>
      </FieldContent>
    </Field>
  );
};

export default UsernameField;
