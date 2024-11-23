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
export type Clock = {
  widget_id: "clock";
  content: {
    timeZone: number;
  };
} & Grid &
  Id;
export type QuickLink = {
  widget_id: "quick-link";
  content: {
    icon: string | null;
    title: string;
    href: string;
  };
} & Grid &
  Id;
export type Notes = {
  widget_id: "notes";
  content: {
    items: string[];
  };
} & Grid &
  Id;

export type Widget = Clock | QuickLink | Notes;
