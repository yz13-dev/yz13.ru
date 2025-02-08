export type ElementType = "page" | "component";

export type Thumbnail = {
  dark: string;
  light: string;
};

export type PageConfig = {
  type: ElementType;
  name: string;
  description: string | null;
  id: string;
  path: string;
  thumbnail: Thumbnail | null;
  animated: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
};
