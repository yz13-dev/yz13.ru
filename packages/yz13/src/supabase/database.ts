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
      calendar_appointment: {
        Row: {
          created_at: string;
          date: string;
          duration: string;
          id: number;
          note: string | null;
          uid: string | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          duration: string;
          id?: number;
          note?: string | null;
          uid?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          duration?: string;
          id?: number;
          note?: string | null;
          uid?: string | null;
        };
        Relationships: [];
      };
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
          id: string;
          last_modified: string | null;
          location: string | null;
          organizer_email: string | null;
          organizer_name: string | null;
          recurrence_id: string | null;
          recurrence_rule: string | null;
          sequence: number | null;
          status: string | null;
          summary: string;
          transp: string | null;
          uid: string;
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
          id?: string;
          last_modified?: string | null;
          location?: string | null;
          organizer_email?: string | null;
          organizer_name?: string | null;
          recurrence_id?: string | null;
          recurrence_rule?: string | null;
          sequence?: number | null;
          status?: string | null;
          summary: string;
          transp?: string | null;
          uid: string;
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
          id?: string;
          last_modified?: string | null;
          location?: string | null;
          organizer_email?: string | null;
          organizer_name?: string | null;
          recurrence_id?: string | null;
          recurrence_rule?: string | null;
          sequence?: number | null;
          status?: string | null;
          summary?: string;
          transp?: string | null;
          uid?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      calendar_schedule: {
        Row: {
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
      chats: {
        Row: {
          attachments: Json[] | null;
          chat_participants: string[] | null;
          created_at: string;
          favorite: boolean | null;
          from_id: string;
          id: string;
          name: string | null;
          "pinned-message": string | null;
          tags: Json[] | null;
          task_lists: Json[] | null;
          type: Database["public"]["Enums"]["chat-type"] | null;
          updated_at: string | null;
        };
        Insert: {
          attachments?: Json[] | null;
          chat_participants?: string[] | null;
          created_at?: string;
          favorite?: boolean | null;
          from_id?: string;
          id?: string;
          name?: string | null;
          "pinned-message"?: string | null;
          tags?: Json[] | null;
          task_lists?: Json[] | null;
          type?: Database["public"]["Enums"]["chat-type"] | null;
          updated_at?: string | null;
        };
        Update: {
          attachments?: Json[] | null;
          chat_participants?: string[] | null;
          created_at?: string;
          favorite?: boolean | null;
          from_id?: string;
          id?: string;
          name?: string | null;
          "pinned-message"?: string | null;
          tags?: Json[] | null;
          task_lists?: Json[] | null;
          type?: Database["public"]["Enums"]["chat-type"] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chats_pinned-message_fkey";
            columns: ["pinned-message"];
            isOneToOne: false;
            referencedRelation: "chats-messages";
            referencedColumns: ["id"];
          },
        ];
      };
      "chats-messages": {
        Row: {
          attachments: string[] | null;
          chat_id: string;
          created_at: string;
          delivered_at: string | null;
          edited_at: string | null;
          from_id: string;
          id: string;
          message: string;
          reply_to: string | null;
          tags: number[];
        };
        Insert: {
          attachments?: string[] | null;
          chat_id?: string;
          created_at?: string;
          delivered_at?: string | null;
          edited_at?: string | null;
          from_id?: string;
          id?: string;
          message?: string;
          reply_to?: string | null;
          tags?: number[];
        };
        Update: {
          attachments?: string[] | null;
          chat_id?: string;
          created_at?: string;
          delivered_at?: string | null;
          edited_at?: string | null;
          from_id?: string;
          id?: string;
          message?: string;
          reply_to?: string | null;
          tags?: number[];
        };
        Relationships: [
          {
            foreignKeyName: "chats-messages_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats-messages_reply_to_fkey";
            columns: ["reply_to"];
            isOneToOne: false;
            referencedRelation: "chats-messages";
            referencedColumns: ["id"];
          },
        ];
      };
      "chats-tasks": {
        Row: {
          chat_id: string;
          checked: boolean | null;
          created_at: string;
          from_id: string;
          id: string;
          note: string | null;
          task_list: number | null;
          title: string | null;
        };
        Insert: {
          chat_id: string;
          checked?: boolean | null;
          created_at?: string;
          from_id: string;
          id?: string;
          note?: string | null;
          task_list?: number | null;
          title?: string | null;
        };
        Update: {
          chat_id?: string;
          checked?: boolean | null;
          created_at?: string;
          from_id?: string;
          id?: string;
          note?: string | null;
          task_list?: number | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chats-tasks_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          },
        ];
      };
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
          public_url: string | null;
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
          public_url?: string | null;
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
          public_url?: string | null;
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
      "chat-type": "personal" | "group";
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
