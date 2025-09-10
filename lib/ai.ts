import { AIResponse, AIResponseSchema } from './types'

const AI_API_KEY = process.env.AI_API_KEY!
const AI_MODEL_NAME = process.env.AI_MODEL_NAME!

export interface GenerateAIResult {
  response: AIResponse
  // True when we had to synthesize a fallback message due to parsing/validation error
  fallbackUsed: boolean
}

export async function generateAIResponse(prompt: string, options?: { enableWebSearch?: boolean }): Promise<GenerateAIResult> {
  if (!AI_API_KEY || !AI_MODEL_NAME) {
    console.error('AI configuration missing. Ensure AI_API_KEY and AI_MODEL_NAME are set.')
  }
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
- {"kind": "chart", "chartType": "bar", "data": [{"label": "string", "value": number}]} - for data visualizations
- {"kind": "clock", "label": "string?", "timezone": "string?"} - for displaying time (e.g., 'America/New_York')
- {"kind": "progress", "value": number, "max": "number?", "label": "string?"} - for progress bars
- {"kind": "alert", "title": "string?", "content": "string", "severity": "info" | "warning" | "success" | "danger"} - for notifications
// Basic/Content
- {"kind": "markdown", "content": "string"}
- {"kind": "code", "language": "ts", "code": "console.log('hi')"}
- {"kind": "list", "ordered": false, "items": ["one","two"]}
- {"kind": "timeline", "items": [{"label": "Started", "timestamp": "2024-01-01"}]}
- {"kind": "accordion", "items": [{"title": "Q1", "content": "A1"}]}
- {"kind": "tabs", "tabs": [{"label": "Tab A", "content": "Hello"}]}
- {"kind": "chips", "chips": [{"label": "Tag"}]}
- {"kind": "avatarList", "avatars": [{"name": "Ada"}]}
- {"kind": "tooltip", "label": "Hover me", "text": "More info"}
- {"kind": "divider", "text": "Section"}
- {"kind": "stepperTabs", "steps": [{"label": "Step 1", "content": "Do X"}]}
// Data/Info
- {"kind": "statCounter", "label": "Users", "value": 123}
- {"kind": "kpiCard", "title": "Revenue", "value": "$12k", "change": 12}
- {"kind": "sparkline", "data": [1,3,2,4,6]}
- {"kind": "gauge", "value": 72}
- {"kind": "heatmap", "values": [[0.1,0.6],[0.3,0.9]], "rowLabels": ["A","B"], "colLabels": ["X","Y"]}
- {"kind": "calendar", "selectedDate": "2025-01-01"}
- {"kind": "timelineChart", "points": [{"t": 1, "v": 10},{"t":2, "v":15}]}
- {"kind": "treemap", "root": {"name": "root", "children": [{"name": "A", "value": 10},{"name": "B", "value": 20}]}}
- {"kind": "treeViewer", "root": {"name": "root", "children": [{"name": "A"}]}}
- {"kind": "jsonViewer", "data": {"a": 1, "b": [2,3]}}
// New components
- {"kind": "table", "headers": ["col1", "col2"], "rows": [["a", 1], ["b", 2]]}
- {"kind": "datagrid", "columns": [{"field": "name", "headerName": "Name"}], "rows": [{"id": 1, "name": "Ada"}], "pageSize": 5}
- {"kind": "map", "center": {"lat": 40.748, "lng": -73.985}, "zoom": 12, "markers": [{"lat": 40.748, "lng": -73.985, "label": "Midtown"}]}
- {"kind": "networkGraph", "nodes": [{"id": "A"},{"id": "B"},{"id": "C"}], "links": [{"source": "A", "target": "B"}, {"source": "B", "target": "C"}], "width": 600, "height": 360}
// Layout/UI
- {"kind": "hero", "title": "string", "subtitle": "string?", "cta": {"label": "string", "href": "string?"}}
- {"kind": "cardGrid", "items": [{"title": "string", "body": "string"}], "columns": 2}
- {"kind": "statGrid", "items": [{"label": "Users", "value": 123}], "columns": 3}
- {"kind": "gridList", "items": [{"title": "string", "subtitle": "string?"}]}
- {"kind": "masonry", "items": [{"content": "string"}]}
- {"kind": "splitView", "left": "string", "right": "string", "ratio": 0.5}
// Feedback/Overlays
- {"kind": "snackbar", "message": "string", "color": "success" | "danger" | "warning" | "neutral"}
- {"kind": "modal", "title": "string?", "content": "string"}
- {"kind": "drawer", "side": "left" | "right" | "top" | "bottom", "content": "string"}
- {"kind": "skeleton", "width": 200, "height": 24}
- {"kind": "progressCircular", "value": 42}
- {"kind": "emptyState", "title": "string", "description": "string?"}
// Media
- {"kind": "video", "src": "string", "controls": true}
- {"kind": "audio", "src": "string", "controls": true}
- {"kind": "imageGallery", "images": [{"url": "string", "alt": "string?"}]}
- {"kind": "mediaCarousel", "items": [{"url": "string", "alt": "string?"}]}
- {"kind": "qr", "text": "string"}
- {"kind": "barcode", "text": "string"}

Form field types (MUST include id, label, and type):
- {"id": "string", "label": "string", "type": "text", "defaultValue": "string"}
- {"id": "string", "label": "string", "type": "select", "options": ["option1", "option2"]}

If the user prompt contains a line starting with "FORCE_COMPONENT:", you MUST use that exact component kind in your response. Prefer returning exactly one component of that kind unless the user asked otherwise.

Choose layout based on content:
- "stack" - vertical list of components
- "grid" - 2-column grid layout
- "carousel" - horizontal scrolling
- "modal" - overlay presentation

Make responses engaging and interactive. Use multiple component types when appropriate.`

  try {
    const requestBody: any = {
      contents: [
        {
          parts: [
            { text: systemPrompt },
            { text: `User request: ${prompt}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
        // Strongly bias the model to emit JSON only
        responseMimeType: 'application/json',
      },
    }

    // Optionally enable Google Search grounding for live data
    if (options?.enableWebSearch) {
      // Enable Google Search grounding (REST accepts tools without explicit toolConfig)
      requestBody.tools = [{ googleSearchRetrieval: {} }]
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL_NAME}:generateContent?key=${AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.candidates || data.candidates.length === 0) {
      console.error('AI API returned no candidates. Full response:', JSON.stringify(data, null, 2))
    }
    
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiText) {
      if (data.promptFeedback?.blockReason) {
        throw new Error(`AI request blocked due to: ${data.promptFeedback.blockReason}`)
      }
      throw new Error('No response from AI')
    }

    // Parse the JSON response
    let parsedResponse: unknown
    let fallbackUsed = false
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanedText = aiText.replace(/```json\n?|\n?```/g, '').trim()
      // If extra prose surrounds the JSON, extract the first JSON object
      if (!(cleanedText.startsWith('{') && cleanedText.endsWith('}'))) {
        const match = cleanedText.match(/\{[\s\S]*\}/)
        if (match) cleanedText = match[0]
      }
      parsedResponse = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', aiText)
      // Fallback response
      fallbackUsed = true
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
    let validatedResponse: AIResponse
    try {
      validatedResponse = AIResponseSchema.parse(parsedResponse)
    } catch (e) {
      console.error('AI response failed schema validation:', e)
      fallbackUsed = true
      validatedResponse = {
        topline: 'I encountered an error processing your request.',
        layout: 'stack',
        components: [
          { kind: 'text', content: 'Sorry, I had trouble generating a response. Please try again.' },
        ],
      }
    }
    return { response: validatedResponse, fallbackUsed }
  } catch (error) {
    console.error('AI generation error:', error)

    const errorMessage = (error instanceof Error && error.message.includes('blocked'))
      ? 'Your request was blocked by our content filter. Please rephrase your prompt and try again.'
      : (!AI_API_KEY || !AI_MODEL_NAME)
        ? 'Server is missing AI configuration. Please set AI_API_KEY and AI_MODEL_NAME.'
        : 'Sorry, I had trouble generating a response. Please try again.'

    // Fallback response
    const fallback: AIResponse = {
      topline: 'I encountered an error processing your request.',
      layout: 'stack',
      components: [
        {
          kind: 'text',
          content: errorMessage,
        },
      ],
    }
    return { response: fallback, fallbackUsed: true }
  }
}
