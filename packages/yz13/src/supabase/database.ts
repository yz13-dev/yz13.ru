export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [];
      };
      "customers-requests": {
        Row: {
          attachments: string[];
          created_at: string;
          email: string;
          id: string;
          subject: string | null;
          text: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          attachments?: string[];
          created_at?: string;
          email: string;
          id?: string;
          subject?: string | null;
          text?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          attachments?: string[];
          created_at?: string;
          email?: string;
          id?: string;
          subject?: string | null;
          text?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      drafts: {
        Row: {
          animated: boolean | null;
          attachments: Json[];
          by: string;
          created_at: string;
          description: string | null;
          id: string;
          published_at: string | null;
          tags: string[];
          thumbnail: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          animated?: boolean | null;
          attachments?: Json[];
          by?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          published_at?: string | null;
          tags?: string[];
          thumbnail?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          animated?: boolean | null;
          attachments?: Json[];
          by?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          published_at?: string | null;
          tags?: string[];
          thumbnail?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      pricing: {
        Row: {
          created_at: string;
          description: string | null;
          details: Json[];
          id: number;
          name: string | null;
          price: number;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          details?: Json[];
          id?: number;
          name?: string | null;
          price?: number;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          details?: Json[];
          id?: number;
          name?: string | null;
          price?: number;
          type?: string | null;
        };
        Relationships: [];
      };
      rooms: {
        Row: {
          created_at: string;
          id: string;
          max_members: number | null;
          name: string | null;
          owner: string;
          public: boolean | null;
          udpated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          max_members?: number | null;
          name?: string | null;
          owner?: string;
          public?: boolean | null;
          udpated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          max_members?: number | null;
          name?: string | null;
          owner?: string;
          public?: boolean | null;
          udpated_at?: string | null;
        };
        Relationships: [];
      };
      "visitor-session": {
        Row: {
          created_at: string;
          duration: number;
          id: string;
          user_agent: string | null;
          user_id: string | null;
          visitor_id: string;
        };
        Insert: {
          created_at?: string;
          duration: number;
          id?: string;
          user_agent?: string | null;
          user_id?: string | null;
          visitor_id: string;
        };
        Update: {
          created_at?: string;
          duration?: number;
          id?: string;
          user_agent?: string | null;
          user_id?: string | null;
          visitor_id?: string;
        };
        Relationships: [];
      };
      works: {
        Row: {
          created_at: string;
          description: string;
          icon: Json | null;
          id: string;
          name: string;
          stage: Database["public"]["Enums"]["works-status"];
          type: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          icon?: Json | null;
          id?: string;
          name?: string;
          stage?: Database["public"]["Enums"]["works-status"];
          type?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          icon?: Json | null;
          id?: string;
          name?: string;
          stage?: Database["public"]["Enums"]["works-status"];
          type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      "widget-type":
        | "clock"
        | "quick-link"
        | "notes"
        | "calendar"
        | "links-folder";
      "works-status":
        | "in_plans"
        | "in_progress"
        | "in_review"
        | "in_testing"
        | "released";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
