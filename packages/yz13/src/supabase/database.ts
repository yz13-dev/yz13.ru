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
      lists: {
        Row: {
          created_at: string;
          icon: string | null;
          id: string;
          name: string;
          updated_at: string | null;
          workspace: string;
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
          workspace?: string;
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
          workspace?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lists_workspace_fkey";
            columns: ["workspace"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      members: {
        Row: {
          created_at: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          checked: boolean;
          checked_at: string | null;
          checked_by: string | null;
          created_at: string;
          created_by: string;
          id: string;
          list_id: string;
          updated_at: string;
        };
        Insert: {
          checked?: boolean;
          checked_at?: string | null;
          checked_by?: string | null;
          created_at?: string;
          created_by?: string;
          id?: string;
          list_id?: string;
          updated_at?: string;
        };
        Update: {
          checked?: boolean;
          checked_at?: string | null;
          checked_by?: string | null;
          created_at?: string;
          created_by?: string;
          id?: string;
          list_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["id"];
          },
        ];
      };
      teams: {
        Row: {
          created_at: string;
          id: string;
          members: string[];
          name: string | null;
          slug: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          members?: string[];
          name?: string | null;
          slug?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          members?: string[];
          name?: string | null;
          slug?: string | null;
        };
        Relationships: [];
      };
      "visitor-session": {
        Row: {
          created_at: string;
          duration: number;
          id: string;
          visitor_id: string;
        };
        Insert: {
          created_at?: string;
          duration: number;
          id?: string;
          visitor_id: string;
        };
        Update: {
          created_at?: string;
          duration?: number;
          id?: string;
          visitor_id?: string;
        };
        Relationships: [];
      };
      works: {
        Row: {
          created_at: string;
          href: string | null;
          icon: string | null;
          id: string;
          status: Database["public"]["Enums"]["works-status"];
          title: string | null;
        };
        Insert: {
          created_at?: string;
          href?: string | null;
          icon?: string | null;
          id?: string;
          status?: Database["public"]["Enums"]["works-status"];
          title?: string | null;
        };
        Update: {
          created_at?: string;
          href?: string | null;
          icon?: string | null;
          id?: string;
          status?: Database["public"]["Enums"]["works-status"];
          title?: string | null;
        };
        Relationships: [];
      };
      workspaces: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string | null;
          public: boolean;
          updated_at: string | null;
          user: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string | null;
          public?: boolean;
          updated_at?: string | null;
          user?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string | null;
          public?: boolean;
          updated_at?: string | null;
          user?: string | null;
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
      "works-status": "plan" | "dev" | "approval" | "prod";
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
