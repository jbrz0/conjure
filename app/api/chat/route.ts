import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAIResponse } from '@/lib/ai'
import { canUserSendMessage, incrementUserUsage } from '@/lib/quota'
import { z } from 'zod'

const ChatRequestSchema = z.object({
  prompt: z.string().min(1).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = ChatRequestSchema.parse(body)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Check quota
    const quotaCheck = await canUserSendMessage(user?.id || null)
    if (!quotaCheck.canSend) {
      return NextResponse.json({
        success: false,
        error: quotaCheck.error,
      }, { status: 429 })
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(prompt)

    // Save to database and increment usage
    if (user) {
      // Save chat message
      await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          prompt,
          response: aiResponse,
        })

      // Increment usage
      await incrementUserUsage(user.id)
    } else {
      // For anonymous users, save without user_id
      await supabase
        .from('chat_messages')
        .insert({
          user_id: null,
          prompt,
          response: aiResponse,
        })
    }

    return NextResponse.json({
      success: true,
      data: aiResponse,
      quota: quotaCheck.quota,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request format',
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 })
  }
}
