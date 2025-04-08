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
export type PublicationIcon = ThemedPublicationIcon | SimplePublicationIcon;
export type Publication = {
  id: string;
  name: string;
  description: string;
  icon: PublicationIcon;
  publisherId: string;
  publisherType: "user" | "organization";
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  publishedVersion: string;
  categories: string[];
  tags: string[];
  illustrations: PublicationAttachment[];
  versions: string[];
  publicUrl: string | null; // null if not published;
  isPublic: boolean; // false while not published, if true not appreared in store;
  isArchived: boolean; // false while not archived, if true not appeared in store;
};
