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
export type Grid = {
  grid: WidgetGridPosition;
};
export type Clock = {
  id: "clock";
  timeZone: number;
} & Grid;
export type QuickLink = {
  id: "quick-link";
  link: {
    icon: string | null;
    title: string;
    href: string;
  };
} & Grid;
export type Notes = {
  id: "notes";
  items: string[];
} & Grid;

export type Widget = Clock | QuickLink | Notes;
