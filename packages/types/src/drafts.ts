export type Attachment = {
  id: string;
  url: string;
  size: number;
  content_type: string;
  created_at: string;
};

export type Draft = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  animated: boolean; // True if thumbnail has videos or gifs
  created_at: string;
  published_at: string | null;
  updated_at: string;
  tags: string[];
  attachments: Attachment[];
  by: string; // user_id
};
