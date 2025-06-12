import { User } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/client";
import { useEffect, useState } from "react";

export const useUser = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const client = createClient();
      const {
        data: { user },
      } = await client.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return [user, loading];
};
