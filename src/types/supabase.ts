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
      sensor_data: {
        Row: {
          created_at: string
          humidity: number | null
          id: number
          temperature: number | null
        }
        Insert: {
          created_at?: string
          humidity?: number | null
          id?: number
          temperature?: number | null
        }
        Update: {
          created_at?: string
          humidity?: number | null
          id?: number
          temperature?: number | null
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
