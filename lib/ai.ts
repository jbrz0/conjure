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
