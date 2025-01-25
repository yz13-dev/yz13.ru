export type DraftMedia = ThemedMedia | NotThemedMedia;

type NotThemedMedia = {
  themed: false;
  id: string;
  url: string;
};

type ThemedMedia = {
  themed: true;
  dark: {
    id: string;
    url: string;
  };
  light: {
    id: string;
    url: string;
  };
};

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
  image?: DraftMedia; // That means image can be changed with website theme
  animated: boolean; // True for videos or gifs
  created_at: string;
  published_at: string | null;
  updated_at: string;
  tags: string[];
  attachments: Attachment[];
  by: string; // user_id
};
