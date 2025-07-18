export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          plan: 'free' | 'pro'
          messages_sent: number
          period_start: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          plan?: 'free' | 'pro'
          messages_sent?: number
          period_start?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          plan?: 'free' | 'pro'
          messages_sent?: number
          period_start?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string | null
          prompt: string
          response: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          prompt: string
          response: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          prompt?: string
          response?: Json
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_user_quotas: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      user_plan: 'free' | 'pro'
    }
  }
}
