import { z } from 'zod'

// AI Response Schema
// This schema now matches the 'FormField' interface in DynamicForm.tsx
export const FieldSpecSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(['text', 'select']),
  options: z.array(z.string()).optional(),
  defaultValue: z.string().optional(),
});

const TextComponentSchema = z.object({
  kind: z.literal('text'),
  content: z.string(),
});

const ChartComponentSchema = z.object({
  kind: z.literal('chart'),
  chartType: z.enum(['bar', 'line', 'pie']),
  data: z.array(z.object({ label: z.string(), value: z.number() })),
});

const ImageComponentSchema = z.object({
  kind: z.literal('image'),
  url: z.string(),
  alt: z.string().optional(),
});

const RatingComponentSchema = z.object({
  kind: z.literal('rating'),
  value: z.number(),
  of: z.number(),
});

const CardComponentSchema = z.object({
  kind: z.literal('card'),
  title: z.string(),
  body: z.string(),
});

const FormComponentSchema = z.object({
  kind: z.literal('form'),
  fields: z.array(FieldSpecSchema),
});

export const ComponentSpecSchema = z.union([
  TextComponentSchema,
  ImageComponentSchema,
  RatingComponentSchema,
  CardComponentSchema,
  FormComponentSchema,
  ChartComponentSchema,
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
