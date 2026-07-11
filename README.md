# AI Recruiter

AI-powered recruitment platform built with Next.js 15 and Supabase.

## Features

- Resume analysis with AI (Google Gemini + Groq fallback)
- Job search recommendations
- Upskilling course suggestions
- Username/password and Google OAuth authentication via Supabase Auth

## Local Development

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

3. Create a [Supabase](https://supabase.com) project, then run the SQL migration in `supabase/migrations/0001_profiles_and_username_auth.sql` via the Supabase SQL Editor. This creates the `profiles` table (stores usernames, linked 1:1 to Supabase's built-in `auth.users`) plus the trigger/functions that back username-based login.

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Authentication

Auth is handled entirely by **Supabase Auth**:

- **Username/password** — Supabase's `auth.users` table securely stores the (hashed) password. A `public.profiles` table stores each user's chosen username and is linked 1:1 to `auth.users` via a database trigger that fires on signup. Login looks up the email for a given username via a `security definer` SQL function (`get_email_for_username`), then signs in with `supabase.auth.signInWithPassword`.
- **Google OAuth** — handled by `supabase.auth.signInWithOAuth({ provider: 'google' })`, configured entirely in the Supabase dashboard (no client ID/secret needed in this app's env vars).
- Session cookies are refreshed and protected routes (`/dashboard/*`) are enforced server-side in [src/middleware.ts](src/middleware.ts).

See the setup checklist below for the exact Supabase + Google Cloud Console configuration required.

## Deploy to Vercel

1. Import this repository in [Vercel](https://vercel.com/new).
2. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`, and `GROQ_API_KEY` in the Vercel project settings.
3. Deploy.
4. In Supabase, add your Vercel deployment's URL to **Authentication → URL Configuration → Redirect URLs** (see checklist below).

### Required Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public API key |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key |
| `GROQ_API_KEY` | Groq API key (fallback AI) |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database & Auth:** Supabase (Postgres + Supabase Auth)
- **AI:** Vercel AI SDK (Google Gemini, Groq)
- **Styling:** Tailwind CSS v4
