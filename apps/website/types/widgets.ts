export type WidgetID =
  | "quick-link"
  | "clock"
  | "weather"
  | "calendar"
  | "todo"
  | "music"
  | "news"
  | "notes"
  | "contacts"
  | "tasks"
  | "events"
  | "roadmap";
export type WidgetGridPosition = {
  column: {
    start: number;
    end: number;
  };
  row: {
    start: number;
    end: number;
  };
};
export type Id = {
  id: string;
};
export type Grid = {
  grid: WidgetGridPosition;
};
type Extension = Grid & Id;
type Link = {
  icon: string | null;
  title: string;
  href: string;
};
export type Clock = {
  widget_id: "clock";
  content: {
    timeZone: string;
  };
} & Extension;
export type QuickLink = {
  widget_id: "quick-link";
  content: Link;
} & Extension;
export type LinksFolder = {
  widget_id: "links-folder";
  content: {
    links: Link[];
    size: "small" | "medium" | "large"; // small - 4x4, medium - 6x6, large - 8x8
  };
} & Extension;
export type Notes = {
  widget_id: "notes";
  content: {
    items: string[];
  };
} & Extension;
export type Calendar = {
  widget_id: "calendar";
  content: {};
} & Extension;

export type Widget = Clock | QuickLink | Notes | Calendar | LinksFolder;
