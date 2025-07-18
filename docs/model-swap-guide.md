# Model Swap Guide

This guide explains how to swap the Google AI model used in Conjure for newer versions.

## Current Implementation

Conjure uses Google's Generative AI REST API with the model name abstracted into the `AI_MODEL_NAME` environment variable. The current default is `gemini-1.5-pro-latest`.

## Swapping Models

### Step 1: Update Environment Variable

Update your environment variable to use the new model:

```env
AI_MODEL_NAME=gemini-1.5-pro-002  # Example new model
```

### Step 2: Verify API Compatibility

Ensure the new model supports the same API format. The current implementation expects:

```javascript
// Request format
{
  "contents": [
    {
      "parts": [
        { "text": "system prompt" },
        { "text": "user prompt" }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 2048
  }
}

// Response format
{
  "candidates": [
    {
      "content": {
        "parts": [
          { "text": "AI response text" }
        ]
      }
    }
  ]
}
```

### Step 3: Test the New Model

1. **Local Testing**: Update your `.env.local` file and test locally
2. **API Testing**: Use the `api-tests.http` file to verify responses
3. **Component Testing**: Ensure the AI still generates valid JSON matching our schema

### Step 4: Update Generation Config (if needed)

If the new model has different optimal parameters, update the `generationConfig` in `lib/ai.ts`:

```typescript
generationConfig: {
  temperature: 0.7,        // Adjust for creativity vs consistency
  topK: 40,               // Adjust for response diversity
  topP: 0.95,             // Adjust for response quality
  maxOutputTokens: 2048,  // Adjust for response length
}
```

### Step 5: Deploy

1. Update environment variables in your deployment platform
2. Deploy the application
3. Monitor for any issues with response generation

## Supported Models

As of the last update, these Google AI models are available:

- `gemini-1.5-pro-latest` (current default)
- `gemini-1.5-pro-001`
- `gemini-1.5-pro-002`
- `gemini-1.5-flash-latest`
- `gemini-1.5-flash-001`

## Model-Specific Considerations

### Gemini 1.5 Pro vs Flash

- **Pro**: Better for complex reasoning, longer context
- **Flash**: Faster responses, lower cost, good for simpler tasks

### Response Quality

Different models may generate responses with varying:
- JSON structure adherence
- Component type usage
- Content creativity
- Response length

## Troubleshooting

### Common Issues

1. **Invalid JSON Responses**
   - The new model might need adjusted prompting
   - Consider updating the system prompt in `lib/ai.ts`

2. **API Rate Limits**
   - Different models may have different rate limits
   - Monitor usage and adjust accordingly

3. **Response Format Changes**
   - Google may update the API response format
   - Update the parsing logic in `generateAIResponse()` if needed

### Testing Checklist

- [ ] AI generates valid JSON responses
- [ ] All component types render correctly
- [ ] Response quality meets expectations
- [ ] API rate limits are acceptable
- [ ] Error handling works properly

## Rollback Plan

If issues occur with the new model:

1. Revert the `AI_MODEL_NAME` environment variable
2. Redeploy the application
3. Investigate issues in a development environment
4. Fix any compatibility problems before trying again

## Future Considerations

### API Changes

Google may introduce breaking changes to their API. Monitor:
- [Google AI documentation](https://ai.google.dev/docs)
- API version updates
- Deprecation notices

### New Features

Newer models might support:
- Function calling
- Multi-modal inputs (images, audio)
- Longer context windows
- Better structured output

Consider updating the application to leverage these features when available.

## Code Locations

Key files to review when swapping models:

- `lib/ai.ts` - Main AI service implementation
- `lib/types.ts` - Response schema definitions
- `components/Renderer.tsx` - Component rendering logic
- `.env.example` - Environment variable documentation

## Support

If you encounter issues during model swapping:

1. Check the Google AI documentation for the specific model
2. Test with the provided API test files
3. Review the application logs for error details
4. Consider reaching out to the development team
