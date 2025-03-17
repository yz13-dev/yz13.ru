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
};
