import type { Session, User as SupabaseUser, UserAttributes, UserIdentity } from "@supabase/supabase-js";
export type UserObject = {
  id: string;
  email: string | undefined;
  email_confirmed_at: string | undefined;
  phone: string | undefined;
  created_at: string;
  updated_at: string | undefined;
  last_signin_at: string | undefined;
  role: string;
  username: string;
  avatar_url: string | null;
  identities: Required<SupabaseUser["identities"]>;
  position: string | undefined;
};
export type User = SupabaseUser;

export type UpdateUserBody = Partial<UserAttributes>;

export type { Session, UserIdentity };

