import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAIResponse } from '@/lib/ai'
import { canUserSendMessage, incrementUserUsage } from '@/lib/quota'
import { z } from 'zod'

const ChatRequestSchema = z.object({
  prompt: z.string().min(1).max(1000),
  forceWebSearch: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, forceWebSearch } = ChatRequestSchema.parse(body)

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

    // Decide whether to enable web search for live/real-time queries
    const lower = prompt.toLowerCase()
    const needsWeb = /(stock|price|ticker|weather|forecast|today|now|current|breaking|news|live|trending|exchange|market|crypto|btc|eth)/.test(lower) || !!forceWebSearch

    // Generate AI response
    const { response: aiResponse, fallbackUsed } = await generateAIResponse(prompt, { enableWebSearch: needsWeb })

    // If the model failed to produce valid output, surface an error and do not count usage
    if (fallbackUsed) {
      return NextResponse.json({
        success: false,
        error: 'The AI had trouble generating a valid response. Please try again.',
      }, { status: 502 })
    }

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
