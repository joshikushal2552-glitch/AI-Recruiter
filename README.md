# AI Recruiter

AI-powered recruitment platform built with Next.js 15, Prisma, PostgreSQL, and NextAuth.

## Features

- Resume analysis with AI (Google Gemini + Groq fallback)
- Job search recommendations
- Upskilling course suggestions
- Google OAuth and email/password authentication

## Local Development

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

3. Run database migrations (requires a PostgreSQL database):

```bash
npx prisma db push
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Import this repository in [Vercel](https://vercel.com/new).
2. Add all environment variables from `.env.example` in the Vercel project settings.
3. Use a hosted PostgreSQL provider (Neon, Supabase, or Vercel Postgres).
4. Deploy — Vercel will run `prisma generate` and `next build` automatically.

`NEXTAUTH_URL` is not needed. NextAuth v4 automatically trusts the incoming request host on Vercel (via the platform's built-in `VERCEL` env var) and falls back to `http://localhost:3000` in local dev, so the callback URL is derived automatically without any env var changes.

In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), add an **Authorized redirect URI** for every domain you actually sign in from, exactly matching `<origin>/api/auth/callback/google`, e.g.:
- `http://localhost:3000/api/auth/callback/google`
- `https://your-app.vercel.app/api/auth/callback/google`
- `https://your-custom-domain.com/api/auth/callback/google` (if used)

This is what actually causes `redirect_uri_mismatch` — Google rejects the callback if the exact origin isn't in that list, regardless of what `NEXTAUTH_URL` is set to.

### Required Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Random secret for session encryption |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key |
| `GROQ_API_KEY` | Groq API key (fallback AI) |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL + Prisma 7
- **Auth:** NextAuth.js
- **AI:** Vercel AI SDK (Google Gemini, Groq)
- **Styling:** Tailwind CSS v4
