export type FileWithId = {
  id: string;
} & File;
export type Attachment = {
  id: string;
  name: string;
  type: string;
  path: string;
  size: number;
  created_at: number;
};
