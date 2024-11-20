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
export type Clock = {
  id: "clock";
  timeZone: number;
};
export type QuickLink = {
  id: "quick-link";
  link: {
    icon: string | null;
    title: string;
    href: string;
  };
};
export type HomeWidget = {
  grid: WidgetGridPosition;
} & (Clock | QuickLink);
