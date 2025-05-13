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
      calendar_events: {
        Row: {
          all_day: boolean | null;
          categories: string[] | null;
          class: string | null;
          created: string | null;
          date_end: string | null;
          date_start: string;
          description: string | null;
          duration: string | null;
          geo_lat: number | null;
          geo_lon: number | null;
          guests: string[] | null;
          id: string;
          last_modified: string | null;
          location: string | null;
          organizer_id: string;
          recurrence_id: string | null;
          recurrence_rule: string | null;
          sequence: number | null;
          status: string | null;
          summary: string;
          type: Database["public"]["Enums"]["event-type"];
          url: string | null;
        };
        Insert: {
          all_day?: boolean | null;
          categories?: string[] | null;
          class?: string | null;
          created?: string | null;
          date_end?: string | null;
          date_start: string;
          description?: string | null;
          duration?: string | null;
          geo_lat?: number | null;
          geo_lon?: number | null;
          guests?: string[] | null;
          id?: string;
          last_modified?: string | null;
          location?: string | null;
          organizer_id?: string;
          recurrence_id?: string | null;
          recurrence_rule?: string | null;
          sequence?: number | null;
          status?: string | null;
          summary: string;
          type?: Database["public"]["Enums"]["event-type"];
          url?: string | null;
        };
        Update: {
          all_day?: boolean | null;
          categories?: string[] | null;
          class?: string | null;
          created?: string | null;
          date_end?: string | null;
          date_start?: string;
          description?: string | null;
          duration?: string | null;
          geo_lat?: number | null;
          geo_lon?: number | null;
          guests?: string[] | null;
          id?: string;
          last_modified?: string | null;
          location?: string | null;
          organizer_id?: string;
          recurrence_id?: string | null;
          recurrence_rule?: string | null;
          sequence?: number | null;
          status?: string | null;
          summary?: string;
          type?: Database["public"]["Enums"]["event-type"];
          url?: string | null;
        };
        Relationships: [];
      };
      calendar_schedule: {
        Row: {
          durations: string[] | null;
          friday: Json[] | null;
          monday: Json[] | null;
          saturday: Json[] | null;
          sunday: Json[] | null;
          thursday: Json[] | null;
          tuesday: Json[] | null;
          uid: string;
          wednesday: Json[] | null;
        };
        Insert: {
          durations?: string[] | null;
          friday?: Json[] | null;
          monday?: Json[] | null;
          saturday?: Json[] | null;
          sunday?: Json[] | null;
          thursday?: Json[] | null;
          tuesday?: Json[] | null;
          uid?: string;
          wednesday?: Json[] | null;
        };
        Update: {
          durations?: string[] | null;
          friday?: Json[] | null;
          monday?: Json[] | null;
          saturday?: Json[] | null;
          sunday?: Json[] | null;
          thursday?: Json[] | null;
          tuesday?: Json[] | null;
          uid?: string;
          wednesday?: Json[] | null;
        };
        Relationships: [];
      };
      news: {
        Row: {
          author: string | null;
          description: string | null;
          id: string;
          img: Json | null;
          method: string;
          published_at: string;
          source: string | null;
          source_id: string | null;
          tags: string[] | null;
          title: string;
          url: string;
        };
        Insert: {
          author?: string | null;
          description?: string | null;
          id?: string;
          img?: Json | null;
          method: string;
          published_at: string;
          source?: string | null;
          source_id?: string | null;
          tags?: string[] | null;
          title: string;
          url: string;
        };
        Update: {
          author?: string | null;
          description?: string | null;
          id?: string;
          img?: Json | null;
          method?: string;
          published_at?: string;
          source?: string | null;
          source_id?: string | null;
          tags?: string[] | null;
          title?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "news_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "news_sources";
            referencedColumns: ["id"];
          },
        ];
      };
      news_sources: {
        Row: {
          country_code: string;
          created_at: string | null;
          id: string;
          name: string;
          rss: string | null;
          url: string;
        };
        Insert: {
          country_code: string;
          created_at?: string | null;
          id?: string;
          name: string;
          rss?: string | null;
          url: string;
        };
        Update: {
          country_code?: string;
          created_at?: string | null;
          id?: string;
          name?: string;
          rss?: string | null;
          url?: string;
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
      publications: {
        Row: {
          categories: string[] | null;
          created_at: string;
          description: string | null;
          icon: Json;
          id: string;
          is_archived: boolean | null;
          name: string;
          public_url: string | null;
          published_version: string | null;
          publisher_id: string;
          publisher_type: string;
          stage: string | null;
          tags: string[] | null;
          updated_at: string;
          versions: Json[] | null;
        };
        Insert: {
          categories?: string[] | null;
          created_at?: string;
          description?: string | null;
          icon: Json;
          id?: string;
          is_archived?: boolean | null;
          name: string;
          public_url?: string | null;
          published_version?: string | null;
          publisher_id: string;
          publisher_type: string;
          stage?: string | null;
          tags?: string[] | null;
          updated_at?: string;
          versions?: Json[] | null;
        };
        Update: {
          categories?: string[] | null;
          created_at?: string;
          description?: string | null;
          icon?: Json;
          id?: string;
          is_archived?: boolean | null;
          name?: string;
          public_url?: string | null;
          published_version?: string | null;
          publisher_id?: string;
          publisher_type?: string;
          stage?: string | null;
          tags?: string[] | null;
          updated_at?: string;
          versions?: Json[] | null;
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
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          max_members?: number | null;
          name?: string | null;
          owner?: string;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          max_members?: number | null;
          name?: string | null;
          owner?: string;
          public?: boolean | null;
          updated_at?: string | null;
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
      "chat-type": "personal" | "group";
      "event-type": "event" | "appointment";
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

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      "chat-type": ["personal", "group"],
      "event-type": ["event", "appointment"],
      "widget-type": [
        "clock",
        "quick-link",
        "notes",
        "calendar",
        "links-folder",
      ],
      "works-status": [
        "in_plans",
        "in_progress",
        "in_review",
        "in_testing",
        "released",
      ],
    },
  },
} as const;
