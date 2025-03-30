import { Tables } from "yz13/supabase/database";

export type VisitorSession = Tables<"visitor-session">;

export type ViewsChartSession = {
  range_start: string;
  range_end: string;
  error: null;
  chart: {
    data: any[];
    labels: string[];
  };
};

export type VisitorSessionBody = {
  visitor_id: string;
  duration: number;
  user_agent: string | null;
  user_id: string | null;
};
