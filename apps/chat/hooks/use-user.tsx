import { makeUserObj } from "@/lib/make-user-obj";
import { useEffect, useState } from "react";
import { UserObject } from "rest-api/types/user";
import { createClient } from "yz13/supabase/client";

export const useUser = (): [UserObject | null, boolean] => {
  const [user, setUser] = useState<UserObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const client = createClient();
      const {
        data: { user },
      } = await client.auth.getUser();
      if (user) setUser(makeUserObj(user));
      setLoading(false);
    };
    fetchUser();
  }, []);

  return [user, loading];
};
