import type { Session, User as SupabaseUser, UserAttributes, UserIdentity } from "@supabase/supabase-js";

type User = SupabaseUser;

type UpdateUserBody = Partial<UserAttributes>;

export type { Session, UpdateUserBody, User, UserIdentity };

