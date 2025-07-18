import { z } from 'zod'

// AI Response Schema
export const FieldSpecSchema = z.discriminatedUnion('field', [
  z.object({
    field: z.literal('input'),
    label: z.string(),
    placeholder: z.string().optional(),
  }),
  z.object({
    field: z.literal('date'),
    label: z.string(),
  }),
  z.object({
    field: z.literal('select'),
    label: z.string(),
    options: z.array(z.string()),
  }),
])

export const ComponentSpecSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('text'),
    content: z.string(),
  }),
  z.object({
    kind: z.literal('image'),
    url: z.string(),
    alt: z.string().optional(),
  }),
  z.object({
    kind: z.literal('rating'),
    value: z.number(),
    of: z.number(),
  }),
  z.object({
    kind: z.literal('card'),
    title: z.string(),
    body: z.string(),
  }),
  z.object({
    kind: z.literal('form'),
    fields: z.array(FieldSpecSchema),
  }),
])

export const AIResponseSchema = z.object({
  topline: z.string(),
  layout: z.enum(['stack', 'grid', 'carousel', 'modal']),
  components: z.array(ComponentSpecSchema),
})

// Type exports
export type FieldSpec = z.infer<typeof FieldSpecSchema>
export type ComponentSpec = z.infer<typeof ComponentSpecSchema>
export type AIResponse = z.infer<typeof AIResponseSchema>

// Database types
export interface User {
  id: string
  email: string
  plan: 'free' | 'pro'
  messages_sent: number
  period_start: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  user_id: string | null
  prompt: string
  response: AIResponse
  created_at: string
}

// Usage tracking
export interface UsageQuota {
  used: number
  limit: number
  resetDate?: Date
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface ChatResponse extends ApiResponse<AIResponse> {
  quota?: UsageQuota
}
