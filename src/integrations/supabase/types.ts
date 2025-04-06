export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      call_preferences: {
        Row: {
          call_frequency: string | null
          call_length: string | null
          created_at: string | null
          id: number
          loved_one_id: number | null
          medication_reminders: boolean | null
          mood_check: boolean | null
          sleep_quality: boolean | null
          upcoming_appointments: boolean | null
          voice_preference: string | null
        }
        Insert: {
          call_frequency?: string | null
          call_length?: string | null
          created_at?: string | null
          id?: number
          loved_one_id?: number | null
          medication_reminders?: boolean | null
          mood_check?: boolean | null
          sleep_quality?: boolean | null
          upcoming_appointments?: boolean | null
          voice_preference?: string | null
        }
        Update: {
          call_frequency?: string | null
          call_length?: string | null
          created_at?: string | null
          id?: number
          loved_one_id?: number | null
          medication_reminders?: boolean | null
          mood_check?: boolean | null
          sleep_quality?: boolean | null
          upcoming_appointments?: boolean | null
          voice_preference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_preferences_loved_one_id_fkey"
            columns: ["loved_one_id"]
            isOneToOne: false
            referencedRelation: "loved_ones"
            referencedColumns: ["id"]
          },
        ]
      }
      consolidated_appointments: {
        Row: {
          appointment_date: string | null
          appointment_time: string | null
          appointment_title: string | null
          call_preference_id: number | null
          created_at: string | null
          frequency: string | null
          id: number
          loved_one_id: number
          time_slot: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date?: string | null
          appointment_time?: string | null
          appointment_title?: string | null
          call_preference_id?: number | null
          created_at?: string | null
          frequency?: string | null
          id: number
          loved_one_id: number
          time_slot?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string | null
          appointment_time?: string | null
          appointment_title?: string | null
          call_preference_id?: number | null
          created_at?: string | null
          frequency?: string | null
          id?: number
          loved_one_id?: number
          time_slot?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consolidated_appointments_call_preference_id_fkey"
            columns: ["call_preference_id"]
            isOneToOne: false
            referencedRelation: "call_preferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consolidated_appointments_loved_one_id_fkey"
            columns: ["loved_one_id"]
            isOneToOne: false
            referencedRelation: "loved_ones"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          call_direction: string | null
          call_duration_secs: number | null
          created_at: string
          happiness_level: string | null
          id: string
          phone_number: string | null
          transcript: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          call_direction?: string | null
          call_duration_secs?: number | null
          created_at?: string
          happiness_level?: string | null
          id?: string
          phone_number?: string | null
          transcript?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          call_direction?: string | null
          call_duration_secs?: number | null
          created_at?: string
          happiness_level?: string | null
          id?: string
          phone_number?: string | null
          transcript?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["phone_number"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      loved_ones: {
        Row: {
          age_range: string | null
          created_at: string | null
          gender: string | null
          id: number
          name: string
          nickname: string | null
          relationship_to_user: string | null
          user_id: number | null
        }
        Insert: {
          age_range?: string | null
          created_at?: string | null
          gender?: string | null
          id?: number
          name: string
          nickname?: string | null
          relationship_to_user?: string | null
          user_id?: number | null
        }
        Update: {
          age_range?: string | null
          created_at?: string | null
          gender?: string | null
          id?: number
          name?: string
          nickname?: string | null
          relationship_to_user?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "loved_ones_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string | null
          id: number
          loved_one_id: number | null
          medication_name: string
          time_taken: string[] | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          loved_one_id?: number | null
          medication_name: string
          time_taken?: string[] | null
        }
        Update: {
          created_at?: string | null
          id?: number
          loved_one_id?: number | null
          medication_name?: string
          time_taken?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "medications_loved_one_id_fkey"
            columns: ["loved_one_id"]
            isOneToOne: false
            referencedRelation: "loved_ones"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          created_at: string | null
          daily_call_summary: boolean | null
          id: number
          loved_one_id: number | null
          low_sentiment: boolean | null
          missed_calls: boolean | null
        }
        Insert: {
          created_at?: string | null
          daily_call_summary?: boolean | null
          id?: number
          loved_one_id?: number | null
          low_sentiment?: boolean | null
          missed_calls?: boolean | null
        }
        Update: {
          created_at?: string | null
          daily_call_summary?: boolean | null
          id?: number
          loved_one_id?: number | null
          low_sentiment?: boolean | null
          missed_calls?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_settings_loved_one_id_fkey"
            columns: ["loved_one_id"]
            isOneToOne: false
            referencedRelation: "loved_ones"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string
          id: number
          phone_number: string | null
          user_name: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          id?: number
          phone_number?: string | null
          user_name?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          id?: number
          phone_number?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
