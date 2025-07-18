import { AIResponse, AIResponseSchema } from './types'

const AI_API_KEY = process.env.AI_API_KEY!
const AI_MODEL_NAME = process.env.AI_MODEL_NAME!

export async function generateAIResponse(prompt: string): Promise<AIResponse> {
  const systemPrompt = `You are Conjure, an AI assistant that creates dynamic, interactive responses. 

CRITICAL: You must ALWAYS respond with valid JSON that exactly matches this schema:

{
  "topline": "one-sentence summary of your response",
  "layout": "stack" | "grid" | "carousel" | "modal",
  "components": [
    // Array of components - use appropriate types based on the user's request
  ]
}

Component types available:
- {"kind": "text", "content": "string"} - for text content
- {"kind": "image", "url": "string", "alt": "string"} - for images
- {"kind": "rating", "value": number, "of": number} - for ratings/scores
- {"kind": "card", "title": "string", "body": "string"} - for card layouts
- {"kind": "form", "fields": [...]} - for interactive forms
- {"kind": "chart", "chartType": "bar", "data": [{"label": "string", "value": number}]} - for data visualizations. Use this for displaying quantitative data.

Form field types (MUST include id, label, and type):
- {"id": "string", "label": "string", "type": "text", "defaultValue": "string"}
- {"id": "string", "label": "string", "type": "select", "options": ["option1", "option2"]}

Choose layout based on content:
- "stack" - vertical list of components
- "grid" - 2-column grid layout
- "carousel" - horizontal scrolling
- "modal" - overlay presentation

Make responses engaging and interactive. Use multiple component types when appropriate.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL_NAME}:generateContent?key=${AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                { text: `User request: ${prompt}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiText) {
      throw new Error('No response from AI')
    }

    // Parse the JSON response
    let parsedResponse: unknown
    try {
      // Clean the response - remove markdown code blocks if present
      const cleanedText = aiText.replace(/```json\n?|\n?```/g, '').trim()
      parsedResponse = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', aiText)
      // Fallback response
      parsedResponse = {
        topline: 'I encountered an error processing your request.',
        layout: 'stack',
        components: [
          {
            kind: 'text',
            content: 'Sorry, I had trouble generating a proper response. Please try again.',
          },
        ],
      }
    }

    // Validate against schema
    const validatedResponse = AIResponseSchema.parse(parsedResponse)
    return validatedResponse
  } catch (error) {
    console.error('AI generation error:', error)
    
    // Fallback response
    return {
      topline: 'I encountered an error processing your request.',
      layout: 'stack',
      components: [
        {
          kind: 'text',
          content: 'Sorry, I had trouble generating a response. Please try again.',
        },
      ],
    }
  }
}
