export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          last_used: string | null
          metadata: Json | null
          name: string
          permissions: string[] | null
          rate_limit: number | null
          rate_limit_window: number | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          last_used?: string | null
          metadata?: Json | null
          name: string
          permissions?: string[] | null
          rate_limit?: number | null
          rate_limit_window?: number | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          last_used?: string | null
          metadata?: Json | null
          name?: string
          permissions?: string[] | null
          rate_limit?: number | null
          rate_limit_window?: number | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog: {
        Row: {
          attachments: Json[]
          authors: string[]
          categories: string[]
          date: string
          id: string
          pinned: boolean
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json[]
          authors?: string[]
          categories?: string[]
          date?: string
          id: string
          pinned?: boolean
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json[]
          authors?: string[]
          categories?: string[]
          date?: string
          id?: string
          pinned?: boolean
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      calendar: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_default: boolean | null
          is_public: boolean | null
          name: string | null
          shared_with: string[] | null
          timezone: string | null
          user_id: string
          visible: boolean | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name?: string | null
          shared_with?: string[] | null
          timezone?: string | null
          user_id?: string
          visible?: boolean | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name?: string | null
          shared_with?: string[] | null
          timezone?: string | null
          user_id?: string
          visible?: boolean | null
        }
        Relationships: []
      }
      events: {
        Row: {
          all_day: boolean | null
          calendar_id: string
          categories: string[] | null
          class: string | null
          conference_id: string | null
          created: string | null
          date_end: string
          date_start: string
          description: string | null
          duration: string | null
          geo_lat: number | null
          geo_lon: number | null
          guests: string[] | null
          id: string
          last_modified: string | null
          location: string | null
          notes: string[] | null
          organizer_id: string
          recurrence_id: string | null
          recurrence_rule: string | null
          sequence: number | null
          status: string | null
          summary: string
          tasks: string[] | null
          type: Database["public"]["Enums"]["event-type"]
          url: string | null
        }
        Insert: {
          all_day?: boolean | null
          calendar_id: string
          categories?: string[] | null
          class?: string | null
          conference_id?: string | null
          created?: string | null
          date_end: string
          date_start: string
          description?: string | null
          duration?: string | null
          geo_lat?: number | null
          geo_lon?: number | null
          guests?: string[] | null
          id?: string
          last_modified?: string | null
          location?: string | null
          notes?: string[] | null
          organizer_id?: string
          recurrence_id?: string | null
          recurrence_rule?: string | null
          sequence?: number | null
          status?: string | null
          summary: string
          tasks?: string[] | null
          type?: Database["public"]["Enums"]["event-type"]
          url?: string | null
        }
        Update: {
          all_day?: boolean | null
          calendar_id?: string
          categories?: string[] | null
          class?: string | null
          conference_id?: string | null
          created?: string | null
          date_end?: string
          date_start?: string
          description?: string | null
          duration?: string | null
          geo_lat?: number | null
          geo_lon?: number | null
          guests?: string[] | null
          id?: string
          last_modified?: string | null
          location?: string | null
          notes?: string[] | null
          organizer_id?: string
          recurrence_id?: string | null
          recurrence_rule?: string | null
          sequence?: number | null
          status?: string | null
          summary?: string
          tasks?: string[] | null
          type?: Database["public"]["Enums"]["event-type"]
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_calendar_id_fkey"
            columns: ["calendar_id"]
            isOneToOne: false
            referencedRelation: "calendar"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          created_at: string
          id: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string | null
          content: string | null
          description: string | null
          id: string
          img: Json | null
          last_checked_at: string | null
          method: string
          published_at: string
          source: string | null
          source_id: string | null
          tags: string[] | null
          title: string
          url: string
        }
        Insert: {
          author?: string | null
          content?: string | null
          description?: string | null
          id?: string
          img?: Json | null
          last_checked_at?: string | null
          method: string
          published_at: string
          source?: string | null
          source_id?: string | null
          tags?: string[] | null
          title: string
          url: string
        }
        Update: {
          author?: string | null
          content?: string | null
          description?: string | null
          id?: string
          img?: Json | null
          last_checked_at?: string | null
          method?: string
          published_at?: string
          source?: string | null
          source_id?: string | null
          tags?: string[] | null
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "news_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      news_sources: {
        Row: {
          country_code: string
          created_at: string | null
          id: string
          last_checked: string | null
          name: string
          rss: string | null
          url: string
        }
        Insert: {
          country_code: string
          created_at?: string | null
          id?: string
          last_checked?: string | null
          name: string
          rss?: string | null
          url: string
        }
        Update: {
          country_code?: string
          created_at?: string | null
          id?: string
          last_checked?: string | null
          name?: string
          rss?: string | null
          url?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          id: string
          name: string | null
          owner: string | null
          pinned: boolean | null
          public: boolean | null
          shared_with: string[] | null
          tags: string[] | null
          workspace_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          owner?: string | null
          pinned?: boolean | null
          public?: boolean | null
          shared_with?: string[] | null
          tags?: string[] | null
          workspace_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          owner?: string | null
          pinned?: boolean | null
          public?: boolean | null
          shared_with?: string[] | null
          tags?: string[] | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pins: {
        Row: {
          attachment: string | null
          created_at: string
          description: string | null
          height: number | null
          id: string
          name: string
          owner: string
          source_url: string | null
          tags: string[] | null
          thumbnail: string | null
          updated_at: string | null
          width: number | null
        }
        Insert: {
          attachment?: string | null
          created_at?: string
          description?: string | null
          height?: number | null
          id?: string
          name: string
          owner?: string
          source_url?: string | null
          tags?: string[] | null
          thumbnail?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          attachment?: string | null
          created_at?: string
          description?: string | null
          height?: number | null
          id?: string
          name?: string
          owner?: string
          source_url?: string | null
          tags?: string[] | null
          thumbnail?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pins_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pins_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pins_boards: {
        Row: {
          authors: string[]
          created_at: string
          id: string
          name: string
          owner: string
          public: boolean
          updated_at: string | null
        }
        Insert: {
          authors?: string[]
          created_at?: string
          id?: string
          name: string
          owner?: string
          public?: boolean
          updated_at?: string | null
        }
        Update: {
          authors?: string[]
          created_at?: string
          id?: string
          name?: string
          owner?: string
          public?: boolean
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pins_boards_owner_fkey1"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pins_boards_owner_fkey1"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pins_boards_anchors: {
        Row: {
          anchor_id: string
          board_id: string
          created_at: string
          pin_id: string
          user_id: string
        }
        Insert: {
          anchor_id?: string
          board_id: string
          created_at?: string
          pin_id: string
          user_id?: string
        }
        Update: {
          anchor_id?: string
          board_id?: string
          created_at?: string
          pin_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pins_boards_anchors_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pins_boards_anchors_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pins_boards_pins_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "pins_boards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pins_boards_pins_pin_id_fkey"
            columns: ["pin_id"]
            isOneToOne: false
            referencedRelation: "pins"
            referencedColumns: ["id"]
          },
        ]
      }
      pins_history: {
        Row: {
          created_at: string
          id: number
          pin_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          pin_id: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          pin_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pins_history_pin_id_fkey"
            columns: ["pin_id"]
            isOneToOne: false
            referencedRelation: "pins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pins_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pins_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pins_tags: {
        Row: {
          created_at: string
          id: string
          label: string
        }
        Insert: {
          created_at?: string
          id: string
          label: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
        }
        Relationships: []
      }
      pricing: {
        Row: {
          created_at: string
          description: string | null
          details: Json[]
          discount: number | null
          duration: number[] | null
          id: number
          name: string | null
          price: number
          type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          details?: Json[]
          discount?: number | null
          duration?: number[] | null
          id?: number
          name?: string | null
          price?: number
          type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          details?: Json[]
          discount?: number | null
          duration?: number[] | null
          id?: number
          name?: string | null
          price?: number
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          attachments: Json[] | null
          category: number | null
          created_at: string
          description: string | null
          icon: Json
          id: string
          is_archived: boolean | null
          name: string
          public_url: string | null
          published_version: string | null
          publisher_id: string
          publisher_type: string
          stage: string | null
          tags: string[] | null
          type: string | null
          updated_at: string
          versions: Json[] | null
        }
        Insert: {
          attachments?: Json[] | null
          category?: number | null
          created_at?: string
          description?: string | null
          icon: Json
          id?: string
          is_archived?: boolean | null
          name: string
          public_url?: string | null
          published_version?: string | null
          publisher_id: string
          publisher_type: string
          stage?: string | null
          tags?: string[] | null
          type?: string | null
          updated_at?: string
          versions?: Json[] | null
        }
        Update: {
          attachments?: Json[] | null
          category?: number | null
          created_at?: string
          description?: string | null
          icon?: Json
          id?: string
          is_archived?: boolean | null
          name?: string
          public_url?: string | null
          published_version?: string | null
          publisher_id?: string
          publisher_type?: string
          stage?: string | null
          tags?: string[] | null
          type?: string | null
          updated_at?: string
          versions?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "publications_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "publications_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      publications_categories: {
        Row: {
          created_at: string
          id: number
          label: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          label?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          label?: string | null
        }
        Relationships: []
      }
      rooms: {
        Row: {
          created_at: string
          id: string
          max_members: number | null
          name: string | null
          owner: string
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          max_members?: number | null
          name?: string | null
          owner?: string
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          max_members?: number | null
          name?: string | null
          owner?: string
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      schedules: {
        Row: {
          calendar_id: string
          durations: string[] | null
          friday: Json[] | null
          monday: Json[] | null
          saturday: Json[] | null
          sunday: Json[] | null
          thursday: Json[] | null
          tuesday: Json[] | null
          uid: string
          wednesday: Json[] | null
        }
        Insert: {
          calendar_id: string
          durations?: string[] | null
          friday?: Json[] | null
          monday?: Json[] | null
          saturday?: Json[] | null
          sunday?: Json[] | null
          thursday?: Json[] | null
          tuesday?: Json[] | null
          uid?: string
          wednesday?: Json[] | null
        }
        Update: {
          calendar_id?: string
          durations?: string[] | null
          friday?: Json[] | null
          monday?: Json[] | null
          saturday?: Json[] | null
          sunday?: Json[] | null
          thursday?: Json[] | null
          tuesday?: Json[] | null
          uid?: string
          wednesday?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_schedule_calendar_id_fkey"
            columns: ["calendar_id"]
            isOneToOne: false
            referencedRelation: "calendar"
            referencedColumns: ["id"]
          },
        ]
      }
      slots: {
        Row: {
          created_at: string
          description: string | null
          duration: string
          id: string
          name: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration: string
          id?: string
          name: string
          owner_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          tag: string | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          tag?: string | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          tag?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          checked: boolean | null
          checked_at: string | null
          checked_by: string | null
          created_at: string
          id: string
          owner: string | null
          priority: number
          tag: string
          updated_at: string | null
          workspace_id: string | null
        }
        Insert: {
          checked?: boolean | null
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          id?: string
          owner?: string | null
          priority?: number
          tag: string
          updated_at?: string | null
          workspace_id?: string | null
        }
        Update: {
          checked?: boolean | null
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          id?: string
          owner?: string | null
          priority?: number
          tag?: string
          updated_at?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_tag_fkey"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      usage: {
        Row: {
          created_at: string
          duration: number | null
          id: number
          method: string | null
          path: string | null
          request_id: string | null
          search_params: string | null
          status_code: number | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          id?: number
          method?: string | null
          path?: string | null
          request_id?: string | null
          search_params?: string | null
          status_code?: number | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          id?: number
          method?: string | null
          path?: string | null
          request_id?: string | null
          search_params?: string | null
          status_code?: number | null
        }
        Relationships: []
      }
      usernames: {
        Row: {
          created_at: string
          handle: string
          user_id: string
        }
        Insert: {
          created_at?: string
          handle: string
          user_id?: string
        }
        Update: {
          created_at?: string
          handle?: string
          user_id?: string
        }
        Relationships: []
      }
      workspaces: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
          owner: string
          public: boolean | null
          shared_with: string[] | null
          tags: string[] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          owner: string
          public?: boolean | null
          shared_with?: string[] | null
          tags?: string[] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          owner?: string
          public?: boolean | null
          shared_with?: string[] | null
          tags?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          updated_at: string | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      cleanup_old_logs: { Args: never; Returns: undefined }
    }
    Enums: {
      "chat-type": "personal" | "group"
      "event-type": "event" | "appointment"
      "widget-type":
      | "clock"
      | "quick-link"
      | "notes"
      | "calendar"
      | "links-folder"
      "works-status":
      | "in_plans"
      | "in_progress"
      | "in_review"
      | "in_testing"
      | "released"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

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
} as const
