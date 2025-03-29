export type FileWithId = {
  id: string;
} & File;
export type ChatAttachment = {
  id: string;
  name: string;
  type: string;
  path: string;
  size: number;
  created_at: number;
};
