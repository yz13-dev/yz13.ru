import { Tables, TablesInsert } from "yz13/supabase/database";
import { ChatAttachment } from "./attachments";

export type PublicationAttachment = ChatAttachment;
export type SimplePublicationIcon = {
  type: "simple";
  url: string;
};
export type ThemedPublicationIcon = {
  type: "themed";
  dark: string;
  light: string;
};
export type PublisherType = "user" | "group";
export type PublicationIcon = ThemedPublicationIcon | SimplePublicationIcon;
export type Publication = Omit<
  Omit<Tables<"publications">, "icon">,
  "publisher_type"
> & {
  icon: PublicationIcon;
  publisher_type: PublisherType;
};
export type NewPublication = Omit<
  Omit<TablesInsert<"publications">, "icon">,
  "publisher_type"
> & {
  icon: PublicationIcon;
  publisher_type: PublisherType;
};

// const newApp: NewPublication = {
//   icon: {
//     type: "simple",
//     url: "https://avatars.githubusercontent.com/u/10199185?v=4",
//   },
//   name: "New app",
//   publisher_id: "1",
//   publisher_type: "user",
// };
