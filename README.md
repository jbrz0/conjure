# Conjure - AI-Powered Dynamic Responses

Conjure is a production-ready MVP that creates dynamic, interactive AI responses using Next.js 14, Supabase, and Google's Gemini AI model.

## Features

- **Dynamic AI Responses**: AI generates structured JSON responses that render as interactive components
- **Tiered Usage**: Anonymous (10 messages), Free (50/month), Pro (1500/month)
- **Authentication**: Supabase Auth with email/password
- **Payments**: Stripe integration for Pro subscriptions ($10/month)
- **Real-time Chat**: Interactive chat interface with history
- **Component Rendering**: Text, images, ratings, cards, and forms
- **Rate Limiting**: Server-side quota enforcement
- **Responsive Design**: Blueprint UI components with dark theme

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React, Blueprint 5
- **Backend**: Supabase (Postgres + Auth), Row-Level Security
- **AI**: Google Gemini 1.5 Pro via REST API
- **Payments**: Stripe Checkout + Webhooks
- **Deployment**: Docker + Digital Ocean
- **Testing**: Vitest + React Testing Library

## Local Development Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- Stripe account
- Google AI API key

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd conjure
pnpm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID=price_your_pro_plan_price_id

# Google AI
AI_API_KEY=your_google_ai_api_key
AI_MODEL_NAME=gemini-1.5-pro-latest

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the migration in `db/001_initial_schema.sql` in your Supabase SQL editor
3. Enable Row Level Security (RLS) is automatically configured

### 4. Stripe Setup

1. Create a Stripe account and get your API keys
2. Create a product and price for the Pro plan ($10/month)
3. Set up a webhook endpoint pointing to `/api/stripe/webhook`
4. Copy the webhook secret to your environment variables

### 5. Google AI Setup

1. Get a Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your environment variables

### 6. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

### Unit Tests

```bash
pnpm test          # Run tests once
pnpm test:watch    # Run tests in watch mode
pnpm test:ui       # Run tests with UI
```

### API Testing

Use the provided `api-tests.http` file with REST Client extension in VS Code, or import into Postman.

### Stripe Test Cards

Use these test card numbers in Stripe Checkout:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## Deployment

### Digital Ocean App Platform

1. Fork this repository to your GitHub account
2. Update `digitalocean.yaml` with your repository details
3. Create a new App on Digital Ocean App Platform
4. Connect your GitHub repository
5. Set all environment variables in the App settings
6. Deploy!

### Docker Deployment

```bash
# Build the image
docker build -t conjure .

# Run the container
docker run -p 3000:3000 --env-file .env.local conjure
```

## Model Swapping Instructions

To swap to a newer Gemini model:

1. Update the `AI_MODEL_NAME` environment variable
2. Verify the new model supports the same API format
3. Test with a few sample requests
4. Deploy the change

The AI service in `lib/ai.ts` is designed to be model-agnostic as long as the Google AI API format remains consistent.

## Architecture

### Directory Structure

```
/app/           # Next.js App Router pages and API routes
/components/    # React components (Renderer, ChatInterface, AuthButton)
/lib/           # Utilities (types, Supabase clients, quota management, AI service)
/db/            # Database migrations
/test/          # Test setup and utilities
```

### Key Components

- **Renderer**: Dynamically renders AI response components
- **ChatInterface**: Main chat UI with history and quota display
- **AuthButton**: Authentication modal and user management
- **Quota System**: Rate limiting and usage tracking
- **AI Service**: Google AI integration with structured response parsing

### Database Schema

- **users**: User profiles with plan and usage tracking
- **chat_messages**: Chat history with JSON responses
- **RLS Policies**: Secure data access per user

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run `pnpm lint` and `pnpm test`
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the GitHub Issues
2. Review the documentation
3. Test with the provided API test files
4. Verify environment variables are correctly set
