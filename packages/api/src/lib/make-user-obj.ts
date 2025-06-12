import type { User, UserObject } from "../types/user";

export const makeUserObj = (user: User): UserObject => {
  const role = user.user_metadata.role as string;
  const username = user.user_metadata.username as string;
  const avatar_url = (user.user_metadata.avatar_url as string) || null;
  const identities = user.identities ?? [];
  const position = user.user_metadata.position as string | undefined;
  return {
    id: user.id,
    email: user.email,
    email_confirmed_at: user.email_confirmed_at,
    phone: user.phone,
    created_at: user.created_at,
    updated_at: user.updated_at,
    last_signin_at: user.last_sign_in_at,
    position,
    role,
    username,
    avatar_url,
    identities,
  };
};
