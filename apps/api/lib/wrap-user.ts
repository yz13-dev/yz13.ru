import { avatarURL } from "@/lib/avatar-url";
import type { UserObject } from "@/schemas/user";
import type { User } from "@yz13/supabase/types";

export const wrapUser = (user: User): UserObject => {
  const role = user.user_metadata.role as string;
  const username = user.user_metadata.username as string;
  const identities = user.identities ?? [];
  const position = user.user_metadata.position as string | undefined;

  const avatar_url = (user.user_metadata.avatar_url as string) || null;

  const wrapped_avatar_url = avatar_url ? avatarURL(avatar_url) : null;

  return {
    id: user.id,
    email: user.email,
    email_confirmed_at: user.email_confirmed_at,
    phone: user.phone,
    created_at: user.created_at,
    updated_at: user.updated_at,
    last_signin_at: user.last_sign_in_at,
    position: position,
    role,
    username,
    avatar_url: wrapped_avatar_url,
    identities,
  };
};
